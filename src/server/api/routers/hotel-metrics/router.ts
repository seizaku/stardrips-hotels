import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";
import { z } from "zod";

export type Hotel = {
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

/**
 * Retrieves hotel and hotel group data along with email metrics from BigQuery.
 */
const hotelMetricsRouter = createTRPCRouter({
  fetchWithQuery: publicProcedure.query(async () => {
    const bigquery = new BigQuery();
    return await bigquery.query<Hotel>({
      query: `
          SELECT *
          FROM stardrips.email_metrics
      `,
    });
  }),
});

export { hotelMetricsRouter };
