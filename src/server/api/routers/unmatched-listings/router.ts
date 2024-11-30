import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { z } from "zod";

export type UnmatchedListing = {
  hotel_name: string;
  city: string;
  country: string;
  group_type: string;
  group_name: string;
  email_subscribed: string;
};

const unmatchedListingsRouter = createTRPCRouter({
  fetchAll: publicProcedure
    .input(
      z.object({
        limit: z.number().int().positive().default(10),
        offset: z.number().int().nonnegative().default(0),
      }),
    )
    .query(async ({ input }) => {
      const bigquery = new BigQuery();

      // Fetch the paginated rows
      const rows = await bigquery.query<UnmatchedListing>({
        query: `
          SELECT * FROM alltophotels.unmatched_hotel_listings
          LIMIT @limit OFFSET @offset
        `,
        params: {
          limit: input.limit,
          offset: input.offset,
        },
      });

      // Fetch the total count of rows
      const countResult = await bigquery.query<{ total: number }>({
        query: `
          SELECT COUNT(*) as total
          FROM alltophotels.unmatched_hotel_listings
        `,
      });

      const total = countResult[0]?.total ?? 0;

      return { rows, count: total };
    }),
});

export { unmatchedListingsRouter };
