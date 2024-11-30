import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { z } from "zod";

export type Email = {
  threadId: string;
  messageId: string;
  body: string;
  hotel: string;
  email: string;
  email_per_property: string;
  date: { value: string }; // Nested object for date
  subject: string;
  snippet: string;
  promo_code: string;
  start_date: { value: string }; // Nested object for start_date
  end_date: { value: string }; // Nested object for end_date
  Period: string;
  value: string;
  summary: string;
  view_email: string; // You can adjust this based on actual data type
};

const emailRouter = createTRPCRouter({
  fetchWithPagination: publicProcedure
    .input(
      z.object({
        limit: z.number().int().positive().default(10),
        offset: z.number().int().nonnegative().default(0),
      }),
    )
    .query(async ({ input }) => {
      const bigquery = new BigQuery();

      const rows = await bigquery.query<Email>({
        query: `
          SELECT *
          FROM stardrips.hotel_emails
          ORDER BY email DESC
          LIMIT @limit OFFSET @offset
        `,
        params: {
          limit: input.limit,
          offset: input.offset,
        },
      });

      return rows;
    }),

  fetchCount: publicProcedure.query(async () => {
    const bigquery = new BigQuery();
    const result = await bigquery.client
      .dataset("stardrips")
      .table("clean_emails")
      .getMetadata();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    return { count: result[0].numRows };
  }),
});

export { emailRouter };
