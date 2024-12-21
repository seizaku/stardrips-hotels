import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BigQuery } from "~/server/api/common/bigquery";

export interface Email {
  threadId: string;
  messageId: string;
  subject: string;
  snippet: string;
  from: string;
  to: string;
  date: string;
  mimeType?: string;
  body: string;
};


const emailRouter = createTRPCRouter({
  fetchWithQuery: publicProcedure
    .input(
      z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
        query: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const bigquery = new BigQuery();

      // Define columns to search
      const searchColumns = ["threadId", "messageId", "subject", "snippet", "`from`", "`to`", "date", "mimeType", "body"];

      // Dynamically generate WHERE conditions
      const whereConditions = searchColumns
        .map((column) => `LOWER(${column}) LIKE LOWER(CONCAT('%', @query, '%'))`)
        .join(" OR ");

      return await bigquery.query<Email>({
        query: `
          SELECT *
          FROM main.emails 
          WHERE ${whereConditions}
          LIMIT @limit
          OFFSET @offset
          `,
        params: {
          offset: (parseInt(input.page ?? "1") - 1) * parseInt(input.limit ?? "100"),
          limit: parseInt(input.limit ?? "100"),
          query: input.query ?? "",
        },
      });
    }),
  count: publicProcedure.query(async () => {
    const bigquery = new BigQuery();
    return (await bigquery.query<{ "f0_": number }>({
      query: `
        SELECT COUNT(threadId)
        FROM main.emails 
        `,
    }))[0]?.f0_;
  })
});

export { emailRouter };
