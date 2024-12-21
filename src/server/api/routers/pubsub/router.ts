import {
  fetchGmailMessages,
  processGmailMessage,
} from "~/features/pubsub/helpers/gmail";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { Gmail } from "~/server/api/common/gmail";
import { type Email } from "~/server/api/routers/emails/router";

/**
 * BQTrackedEmails
 */
const LABEL_ID = "Label_4124065210019607459";

/**
 * Extracts metadata and inserts a new hotel record into BigQuery.
 */
async function handleNewHotel(
  gmailClient: Gmail,
  bigquery: BigQuery,
  email: { from: string },
) {
  try {
    const hotel = await bigquery.query<Email>({
      query: "SELECT * FROM main.emails WHERE `from` = @from LIMIT 1",
      params: {
        from: email.from,
      },
    });

    const message = await gmailClient.client.users.messages.get({
      userId: "me",
      id: hotel[0]?.messageId,
    });

    const hotelName = message.data.payload?.headers
      ?.find((h) => h.name === "From")
      ?.value?.split("<")[0]
      ?.replace(/[\\\"*]/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim();

    await bigquery.client
      .dataset("main")
      .table("hotels")
      .insert([
        {
          email: email.from,
          hotel: hotelName ?? "Unknown",
        },
      ]);
  } catch {
    console.warn("Failed to insert new hotel email: ", email.from);
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

    console.log(
      "Total threads",
      await gmailClient.client.users.getProfile({
        userId: "me",
      }),
    );

    do {
      try {
        const messagesResponse = await fetchGmailMessages(
          gmailClient,
          nextPageToken ?? undefined,
        );

        const processedEmails = (
          await Promise.all(
            (messagesResponse.data.messages ?? []).map(async (item) => {
              try {
                const email = await processGmailMessage(gmailClient, item);
                if (!email) return null;

                const [hotelExists] = await bigquery.query<{ count: number }>({
                  query:
                    "SELECT COUNT(*) FROM main.hotels WHERE email = @email",
                  params: { email: email.from },
                });

                if (hotelExists?.count == 0) {
                  console.log(`Hotel not found for email: ${email.from}`);
                  await handleNewHotel(gmailClient, bigquery, email);
                }

                // Ensure each email is inserted only after confirming that hotel insertion occurred.
                await bigquery.client
                  .dataset("main")
                  .table("emails")
                  .insert([email]);

                return email;
              } catch (error) {
                console.error(
                  "An error occurred while processing email:",
                  error,
                );
                return null;
              }
            }),
          )
        ).filter((email) => email !== null);

        if (processedEmails.length > 0) {
          // Now that both hotel and email data is inserted, proceed to label the messages.
          await gmailClient.client.users.messages
            .batchModify({
              userId: "me",
              requestBody: {
                ids: processedEmails.map((email) => email.messageId),
                addLabelIds: [LABEL_ID],
              },
            })
            .then(() => {
              console.log(
                processedEmails.map((email) => email.messageId).join(", "),
              );
              processedEmailCount += processedEmails.length;
              console.log(`Processed ${processedEmailCount} emails.`);
            })
            .catch((error) => {
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
