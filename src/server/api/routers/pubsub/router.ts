import {
  fetchGmailMessages,
  processGmailMessage,
} from "~/features/pubsub/helpers/gmail";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { Gmail } from "~/server/api/common/gmail";
import { extractDomain } from "~/features/pubsub/helpers/domain";
import getMetaData from "metadata-scraper";

const LABEL_ID = "Label_4124065210019607459";

/**
 * Extracts metadata and inserts a new hotel record into BigQuery.
 */
async function handleNewHotel(bigquery: BigQuery, email: { from: string }) {
  const { provider, domain } = extractDomain(email.from);
  try {
    const url = `https://${domain}`;
    const data = await getMetaData(url);

    await bigquery.client.dataset("main").table("hotels").insert([{
      email: email.from,
      hotel: data.provider,
    }]);
  } catch {
    console.warn("Failed to insert record, retrying...");
    await bigquery.client.dataset("main").table("hotels").insert([{
      email: email.from,
      hotel: provider,
    }]);
  }
}

/**
 * Router for processing new Gmail messages received via Pub/Sub POST requests.
 */
const pubSubRouter = createTRPCRouter({
  gmail: publicProcedure.query(async () => {
    const gmailClient = new Gmail();
    const bigquery = new BigQuery();

    let processedEmailCount = 0;
    let nextPageToken: string | undefined | null;

    console.log("Total threads", await gmailClient.client.users.getProfile({
      userId: "me",
    }));

    do {
      try {
        const messagesResponse = await fetchGmailMessages(gmailClient, nextPageToken ?? undefined);

        const processedEmails = (
            await Promise.all((messagesResponse.data.messages ?? []).map(async (item) => {
              try {
                const email = await processGmailMessage(gmailClient, item);
                if (!email) return null;

                const [hotelExists] = await bigquery.query<{ count: number }>({
                  query: "SELECT COUNT(*) FROM main.hotels WHERE email = @email",
                  params: { email: email.from },
                });

                if (hotelExists?.count == 0) {
                  console.log(`Hotel not found for email: ${email.from}`);
                  await handleNewHotel(bigquery, email);
                }

                // Ensure each email is inserted only after confirming that hotel insertion occurred.
                await bigquery.client.dataset("main").table("emails").insert([email]);

                return email;
              } catch (error) {
                console.error("An error occurred while processing email:", error);
                return null;
              }
            }))
        ).filter(email => email !== null);

        if (processedEmails.length > 0) {
          // Now that both hotel and email data is inserted, proceed to label the messages.
          await gmailClient.client.users.messages.batchModify({
            userId: "me",
            requestBody: {
              ids: processedEmails.map(email => email.messageId),
              addLabelIds: [LABEL_ID],
            }
          }).then(() => {
            console.log(processedEmails.map(email => email.messageId).join(", "));
            processedEmailCount += processedEmails.length;
            console.log(`Processed ${processedEmailCount} emails.`);
          }).catch(error => {
            console.error("An error occurred while labelling emails:", error);
          });
        }

        nextPageToken = messagesResponse.data.nextPageToken;
      } catch (error) {
        console.error("An error occurred while processing batch:", error);
        nextPageToken = undefined;
      }
    } while (nextPageToken);
  }),
  watchGmail: publicProcedure.mutation(async () => {
    const gmailClient = new Gmail();
    await gmailClient.client.users.watch({
      userId: "me",
      requestBody: {
        topicName: "projects/stardrips/topics/gmail",
      },
    });
  }),
});

export { pubSubRouter };