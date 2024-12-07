import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  fetchGmailMessages,
  processGmailMessage,
} from "~/features/pubsub/helpers/gmail";
import { BigQuery } from "~/server/api/common/bigquery";
import { Gmail } from "~/server/api/common/gmail";
import { extractDomain } from "~/features/pubsub/helpers/domain";
import getMetaData from "metadata-scraper";

/**
 * Router for processing new Gmail messages received via Pub/Sub POST requests.
 * This router handles incoming notifications about new email messages.
 */
const pubSubRouter = createTRPCRouter({
  gmail: publicProcedure.query(async () => {
    const gmail = new Gmail();
    const bigquery = new BigQuery();

    let count = 0;
    let nextPageToken = undefined;

    do {
      try {
        const messagesResponse = await fetchGmailMessages(gmail, nextPageToken);
        /**
         * Process each raw email and convert it into structured JSON format.
         */
        const processedEmails = (
          await Promise.all(
            messagesResponse.data.messages!.map(async (item) => {
              return await processGmailMessage(gmail, item).then(
                async (email) => {
                  if (!email) return null;

                  const hotelExists = await bigquery.query<{ count: number }>({
                    query:
                      "SELECT COUNT(*) FROM main.hotels WHERE email = @email",
                    params: { email: email.from },
                  });

                  /**
                   * If the hotel does not exist, extract its metadata and insert into the BigQuery table
                   */
                  if (!hotelExists[0]?.count) {
                    const { provider, domain } = extractDomain(email.from);
                    const url = `https://${domain}`;
                    await getMetaData(url).then(
                      async (data) =>
                        await bigquery.client
                          .dataset("main")
                          .table("hotels")
                          .insert([
                            {
                              email: email.from,
                              hotel: data.provider ?? provider,
                            },
                          ]),
                    );
                  }

                  return email;
                },
              );
            }),
          )
        ).filter((email) => email !== null);

        /**
         * Inserts processed email data into the BigQuery table "emails".
         * Post-insertion, the corresponding Gmail messages are labeled accordingly.
         */
        await bigquery.client
          .dataset("main")
          .table("emails")
          .insert(processedEmails)
          .then(
            async () =>
              await gmail.client.users.messages.batchModify({
                userId: "me",
                requestBody: {
                  ids: processedEmails.map((email) => email.messageId),
                  addLabelIds: ["Label_4124065210019607459"],
                },
              }),
          );

        count += processedEmails.length;

        console.log(`Processed ${count} emails.`);
        nextPageToken = messagesResponse.data.nextPageToken;
      } catch (error) {
        console.log("An error occurred while processing emails:", error);
        nextPageToken = undefined;
      }
    } while (nextPageToken);
  }),
  watchGmail: publicProcedure.mutation(async () => {
    const gmail = new Gmail();
    await gmail.client.users.watch({
      userId: "me",
      requestBody: {
        topicName: "projects/stardrips/topics/gmail",
      },
    });
  })
});

export { pubSubRouter };
