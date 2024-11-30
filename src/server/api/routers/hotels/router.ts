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

const hotelRouter = createTRPCRouter({
  fetchAll: publicProcedure.query(async () => {
    const bigquery = new BigQuery();

    const rows = await bigquery.query<Hotel>(`
        SELECT * FROM stardrips.email_metrics
      `);

    return rows;
  }),
  update: publicProcedure
    .input(
      z.object({
        rows: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      const bigquery = new BigQuery();
      for (const item of input.rows as Hotel[]) {
        const params = Object.keys(item)
          .filter(
            (column) =>
              typeof column === "string" && !["email", "from"].includes(column),
          )
          .reduce(
            (acc, column) => {
              const value = item[column as keyof Hotel];

              switch (column as keyof Hotel) {
                case "last_updated":
                  acc[column] = new Date().toISOString();
                  break;
                case "is_valid_hotel":
                  // Handle boolean conversion from string values
                  const boolValue = (value as string)?.toLowerCase();
                  acc[column] =
                    boolValue === "true"
                      ? true
                      : boolValue === "false"
                        ? false
                        : value;
                  break;
                default:
                  // If the value is an object, stringify it, otherwise, keep it as is
                  acc[column] =
                    value && typeof value === "object"
                      ? JSON.stringify(value)
                      : value;
                  break;
              }
              return acc;
            },
            {} as Record<string, unknown>,
          );

        const setClause = Object.keys(item)
          .filter((column) => column !== "email" && column !== "from") // Exclude 'email' and 'from' from SET clause
          .map((column) => `${column} = @${column}`)
          .join(", ");

        const query = `
          UPDATE stardrips.hotels 
          SET ${setClause}
          WHERE email = @email
        `;

        try {
          await bigquery.client.query({
            query,
            params: { ...params, email: item.email },
          });

          console.log(`Update successful for email: ${item.email}`);
        } catch (err) {
          console.error("Error running query:", err);
        }
      }

      return true;
    }),
});

export { hotelRouter };
