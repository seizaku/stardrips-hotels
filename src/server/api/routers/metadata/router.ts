import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BigQuery } from "~/server/api/common/bigquery";

export interface Metadata {
  hotel_name: string;
  adr: string;
  chains_and_brands: string;
  city: string;
  country: string;
  group_type: string;
  group_name: string;
  website: string;
  review_score: string;
  star_rating: string;
  rooms: string;
  photo_gallery: string[];
  maxGuests: number;
  roomTypes: { type: string, maxGuests: number }[];
  address: string;
  property_highlights: string[];
  label: string;
};


const metadataRouter = createTRPCRouter({
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
      const searchColumns = [
        "hotel_name",
        "chains_and_brands",
        "city",
        "country",
        "group_type",
        "group_name",
        "rooms",
        "star_rating",
        "review_score",
        "website",
        "label",
        "address"
      ];
      // Dynamically generate WHERE conditions
      const whereConditions = searchColumns
        .map((column) => `LOWER(${column}) LIKE LOWER(CONCAT('%', @query, '%'))`)
        .join(" OR ");

      return await bigquery.query<Metadata>({
        query: `
          SELECT *
          FROM main.gsheet_with_metadata 
          WHERE ${whereConditions}
          ORDER BY label DESC
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
        FROM main.gsheet_with_metadata 
        `,
    }))[0]?.f0_;
  })
});

export { metadataRouter };
