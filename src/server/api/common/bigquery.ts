import { BigQuery as BigQueryClient, type Query } from "@google-cloud/bigquery";
import { env } from "~/env";

export class BigQuery {
  public client: BigQueryClient;

  constructor() {
    this.client = new BigQueryClient({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: env.SERVICE_EMAIL,
        private_key: (env.SERVICE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
      },
    });
  }

  async query<T>(params: Query): Promise<T[]> {
    try {
      const [rows] = await this.client.query({
        query: params.query,
        params: params.params,
      });

      return rows as T[];
    } catch (error) {
      console.error("Error querying BigQuery:", error);
      return [];
    }
  }
}
