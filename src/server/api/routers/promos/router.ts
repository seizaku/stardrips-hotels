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
  fetchAll: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const bigquery = new BigQuery();

      const offset = (page - 1) * pageSize;

      const [rows]: [Promotion[]] = await bigquery.query(`
        SELECT *
        FROM stardrips.email_promos p
        INNER JOIN stardrips.hotels h
          ON p.email = h.email
        INNER JOIN stardrips.clean_emails c
          ON p.threadId = c.threadId
          AND p.messageId = c.messageId
        ORDER BY promo_code DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `);

      return rows ?? [];
    }),
});

export { promotionRouter };
