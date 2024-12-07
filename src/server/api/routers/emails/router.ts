import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { z } from "zod";

export type Email = {
  threadId: string;
  messageId: string;
  labelIds?: string;
  category?: string;
  subject: string;
  snippet: string;
  from: string;
  to: string;
  date: string;
  mimeType?: string;
  body: string;
};

export type EmailWithPromocode = Email & {
  hotel: string;
  email: string;
  email_per_property: string;
  date: { value: string };
  promo_code: string;
  start_date: { value: string };
  end_date: { value: string };
  period: string;
  value: string;
  summary: string;
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

      const rows = await bigquery.query<EmailWithPromocode>({
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
