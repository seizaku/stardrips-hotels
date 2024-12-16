import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { BigQuery } from "~/server/api/common/bigquery";

const hotelRouter = createTRPCRouter({
  fetchWithQuery: publicProcedure
    .input(
      z.object({
        page: z.number(),
        size: z.number(),
        query: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const bigquery = new BigQuery();
      return await bigquery.query({
        query: `
          SELECT *
          FROM main.hotels LIMIT @size
          OFFSET @offset
        `,
        params: {
          page: input.page,
          size: input.size,
          query: input.query,
        },
      });
    }),
});

export { hotelRouter };
