import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BigQuery } from "~/server/api/common/bigquery";

export interface Hotel {
  email: string;
  hotel: string;
};

export interface HotelProperties extends Hotel {
  properties: string;
}

const hotelRouter = createTRPCRouter({
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
      const searchColumns = ["hotel", "email", "properties"];

      // Dynamically generate WHERE conditions
      const whereConditions = searchColumns
        .map((column) => `LOWER(${column}) LIKE LOWER(CONCAT('%', @query, '%'))`)
        .join(" OR ");

      return await bigquery.query<HotelProperties>({
        query: `
          SELECT *
          FROM main.hotel_properties 
          WHERE ${whereConditions}
          LIMIT @limit
          OFFSET @page
          `,
        params: {
          page: parseInt(input.page ?? "1") - 1,
          limit: parseInt(input.limit ?? "100"),
          query: input.query ?? ""
        },
      });
    }),
  count: publicProcedure.query(async () => {
    const bigquery = new BigQuery();
    return (await bigquery.query<{ "f0_": number }>({
      query: `
        SELECT COUNT(hotel)
        FROM main.hotel_properties 
        `,
    }))[0]?.f0_;
  })
});

export { hotelRouter };
