import { type gmail_v1 } from "googleapis";
import { Base64 } from "js-base64";
import { type Email } from "~/server/api/routers/emails/router";

const extractEmail = (text: string): string => {
  const match = /<([^>]+)>/.exec(text);
  return match?.[1] ?? text;
};

type MailHeaders = {
  subject: string;
  from: string;
  to: string;
  date: string;
};

const extractHeaderValue = (name: string, value: string): string => {
  if (name === "Subject") return value.trim();
  if (name === "Date") return new Date(value).toISOString();
  return extractEmail(value);
};

const extractHeaders = (
  headers: gmail_v1.Schema$MessagePartHeader[] = []
): MailHeaders =>
  headers.reduce((acc, { name, value }) => {
    if (value && ["From", "To", "Subject", "Date"].includes(name!)) {
      acc[name?.toLowerCase() as keyof MailHeaders] = extractHeaderValue(name!, value);
    }
    return acc;
  }, {} as MailHeaders);

const extractBody = (parts: gmail_v1.Schema$MessagePart[] = []): string => {
  for (const part of parts) {
    if (part.mimeType === "text/html") {
      return Base64.decode(part.body?.data ?? "").trim();
    }
    if (part.mimeType?.startsWith("multipart/")) {
      return extractBody(part.parts ?? []);
    }
  }
  return "";
};

const parseHTML = (payload: gmail_v1.Schema$Message["payload"]): string => {
  return payload?.body?.data
    ? Base64.decode(payload.body.data).trim()
    : extractBody(payload?.parts);
};

const parseEmail = (data: gmail_v1.Schema$Message, threadId: string): Email => {
  const headers = extractHeaders(data.payload?.headers);
  return {
    threadId: threadId.trim(),
    messageId: data.id!.trim(),
    subject: headers.subject,
    snippet: data.snippet?.trim() ?? "",
    from: headers.from,
    to: headers.to,
    date: headers.date,
    mimeType: data.payload?.mimeType?.trim() ?? "",
    body: parseHTML(data.payload),
  };
};

export { parseEmail };