/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BigQuery } from "~/server/api/common/bigquery";

export type Promotion = {
  threadId: string;
  messageId: string;
  date: { value: string };
  body: string;
  hotel: string;
  promo_code: string;
  start_date: { value: string };
  end_date: { value: string };
  period: string;
  value: string;
  summary: string;
  email: string;
};

const promotionRouter = createTRPCRouter({
  fetchAll: publicProcedure.query(async () => {
    const bigquery = new BigQuery();

    const rows = await bigquery.query(`
        SELECT *
        FROM stardrips.email_promos p
        INNER JOIN stardrips.hotels h
          ON p.email = h.email
        INNER JOIN stardrips.clean_emails c
          ON p.threadId = c.threadId
          AND p.messageId = c.messageId
        ORDER BY promo_code DESC
      `);

    return rows;
  }),
});

export { promotionRouter };
