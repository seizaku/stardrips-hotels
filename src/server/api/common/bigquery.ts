import {
  BigQuery as BigQueryClient,
  type BigQueryOptions,
} from "@google-cloud/bigquery";
import { env } from "~/env";

export class BigQuery {
  private client: BigQueryClient;

  constructor(options?: BigQueryOptions) {
    this.client = new BigQueryClient({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: env.SERVICE_EMAIL,
        private_key: (env.SERVICE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
      },
      ...options,
    });
  }

  async query(sqlQuery: string) {
    try {
      const [rows] = await this.client.query({ query: sqlQuery });
      return rows as never;
    } catch (error) {
      console.error("Error querying BigQuery:", error);
      throw error;
    }
  }
}
