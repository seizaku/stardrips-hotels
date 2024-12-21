import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BigQuery } from "~/server/api/common/bigquery";

export type SheetListings = {
  status?: "Matched" | "Unmatched";
  hotel_name: string;
  city: string;
  country: string;
  chains_and_brands?: string;
  group_type: string;
  group_name: string;
};

const matchListingRouter = createTRPCRouter({
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
      const searchColumns = ["hotel_name", "city", "country", "chains_and_brands", "group_type", "group_name"];

      // Dynamically generate WHERE conditions
      const whereConditions = searchColumns
        .map((column) => `LOWER(${column}) LIKE LOWER(CONCAT('%', @query, '%'))`)
        .join(" OR ");

      return await bigquery.query<SheetListings>({
        query: `
          SELECT *
          FROM sheet_listings.index
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
        SELECT COUNT(hotel_name)
        FROM sheet_listings.index 
        `,
    }))[0]?.f0_;
  }),
  matchListing: publicProcedure.input(z.object({
    email: z.string(),
    property: z.string()
  })).mutation(async ({ input }) => {
    const bigquery = new BigQuery();
    console.log(input);
    await bigquery.query({
      query: `
      INSERT INTO main.hotel_matches (email, property)
      VALUES (@email, @property)
      `,
      params: {
        email: input.email,
        property: input.property
      }
    })
    return true;
  })
});

export { matchListingRouter };
