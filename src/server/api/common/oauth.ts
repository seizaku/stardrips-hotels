import { google } from "googleapis";
import { env } from "~/env";

export class GoogleAuth {
  readonly auth;

  constructor() {
    this.auth = new google.auth.OAuth2(
      env.CLIENT_ID,
      env.CLIENT_SECRET,
      env.REDIRECT_URL,
    );

    this.auth.setCredentials({
      refresh_token: env.CLIENT_REFRESH_TOKEN,
    });
  }
}
