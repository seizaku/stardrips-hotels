import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GoogleAuth } from "~/server/api/common/oauth";
import { z } from "zod";

/**
 * Handle authentication for Google Services
 */
const authRouter = createTRPCRouter({
  getAuthURL: publicProcedure.query(async () => {
    const client = new GoogleAuth();
    return client.auth.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/gmail.readonly",
      ],
      prompt: "consent",
    });
  }),
  callback: publicProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const client = new GoogleAuth();
      const result = await client.auth.getToken(input.code.toString());
      client.auth.setCredentials(result.tokens);

      return result.tokens;
    }),
});

export { authRouter };
