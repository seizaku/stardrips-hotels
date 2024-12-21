import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BigQuery } from "~/server/api/common/bigquery";


export type HotelMetrics = {
  email: string;
  domain: string;
  hotel: string;
  total_emails: number;
  first_email: { value: string };
  last_email: { value: string };
  avg_time_between_emails: number;
  is_valid_hotel: boolean;
  to: string[];
  count: number;
  last_updated: { value: string };
};

const hotelMetricsRouter = createTRPCRouter({
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
      const searchColumns = ["`from`", "email"];

      // Dynamically generate WHERE conditions
      const whereConditions = searchColumns
        .map((column) => `LOWER(${column}) LIKE LOWER(CONCAT('%', @query, '%'))`)
        .join(" OR ");

      return await bigquery.query<HotelMetrics>({
        query: `
          SELECT *
          FROM stardrips.email_metrics 
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
        SELECT COUNT(hotel)
        FROM stardrips.email_metrics 
        `,
    }))[0]?.f0_;
  })
});

export { hotelMetricsRouter };
