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

const matchedListingsRouter = createTRPCRouter({
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
      const rows = await bigquery.query<Listing>({
        query: `
          SELECT *
          FROM mailcrux.hotel_listings_with_metadata
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
          FROM mailcrux.hotel_listings_with_metadata
        `,
      });

      const total = countResult[0]?.total ?? 0;

      return { rows, count: total };
    }),
});

export { matchedListingsRouter };