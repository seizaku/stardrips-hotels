import { BigQuery as BigQueryClient, type Query } from "@google-cloud/bigquery";
import { env } from "~/env";
import {fromBase64} from "js-base64";
import type { JWTInput} from "google-auth-library";

export class BigQuery {
  public client: BigQueryClient;

  constructor() {
    // console.log(data);
    this.client = new BigQueryClient({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: env.SERVICE_EMAIL,
        private_key: fromBase64(env.SERVICE_PRIVATE_KEY)
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
