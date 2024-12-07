import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { z } from "zod";

export type Listing = {
  hotel_name: string;
  label: string;
  placeId: string;
  city: string;
  country: string;
  group_name: string;
  group_type: string;
  rooms: number;
  rating: number;
  photos: string; // JSON string of photo URLs
  features: string; // JSON string of features
  reviews: string; // JSON string of reviews
  fine_print: string; // JSON string of fine print details
  latitude: number;
  longitude: number;
  email_subscribed: string;
  hotel_email_accounts: string;
  website: string;
};

/**
 * Retrieves both matched and unmatched listings from BigQuery.
 */
const listingsRouter = createTRPCRouter({
  fetchAll: publicProcedure
    .input(
      z.object({
        limit: z.number().int().positive().default(10),
        offset: z.number().int().nonnegative().default(0),
      }),
    )
    .query(async ({ input }) => {
      const bigquery = new BigQuery();

      const rows = await bigquery.query<Listing>({
        query: `
          SELECT *
          FROM mailcrux.listings
          LIMIT @limit OFFSET @offset
        `,
        params: {
          limit: input.limit,
          offset: input.offset,
        },
      });

      const countResult = await bigquery.query<{ total: number }>({
        query: `
          SELECT COUNT(*) as total
          FROM mailcrux.listings
        `,
      });

      console.log(countResult);

      const total = countResult[0]?.total ?? 0;

      return { rows, count: total };
    }),
});

export { listingsRouter };
