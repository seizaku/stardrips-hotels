/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BigQuery as BigQueryClient,
  type BigQueryOptions,
} from "@google-cloud/bigquery";
import { env } from "~/env";

export class BigQuery {
  public client: BigQueryClient;

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

  async query<T>(params: { query: string; params?: any }): Promise<T[]> {
    try {
      const [rows] = await this.client.query({
        query: params.query,
        params: params.params,
      });
      return rows;
    } catch (error) {
      console.error("Error querying BigQuery:", error);
      return [];
    }
  }
}
