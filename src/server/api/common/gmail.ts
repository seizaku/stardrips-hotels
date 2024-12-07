import { type gmail_v1, google } from "googleapis";
import { GoogleAuth } from "./oauth";

export class Gmail {
  client: gmail_v1.Gmail;

  constructor() {
    this.client = google.gmail({
      version: "v1",
      auth: new GoogleAuth().auth,
    });
  }
}
