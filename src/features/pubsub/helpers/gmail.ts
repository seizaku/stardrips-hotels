import { type gmail_v1 } from "googleapis";
import { type Gmail } from "~/server/api/common/gmail";
import { parseEmail } from "~/features/pubsub/helpers/email";

const fetchGmailMessages = async (gmail: Gmail, nextPageToken?: string) => {
  return await gmail.client.users.messages.list({
    userId: "me",
    q: "-label:BQTrackedEmails",
    pageToken: nextPageToken,
    maxResults: 100,
  });
};

const processGmailMessage = async (
  gmail: Gmail,
  item: gmail_v1.Schema$Message,
) => {
  try {
    const message = await gmail.client.users.messages.get({
      userId: "me",
      id: item.id!,
    });

    return parseEmail(message.data, item.threadId!);
  } catch (error) {
    console.log(`Failed to process item: ThreadID: ${item.threadId}`, error);
    return null;
  }
};

export { fetchGmailMessages, processGmailMessage };