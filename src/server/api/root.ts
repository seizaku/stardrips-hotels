import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { promotionRouter } from "./routers/promos/router";
import { hotelRouter } from "./routers/hotels/router";
import { emailRouter } from "./routers/emails/router";
import { matchedListingsRouter } from "./routers/matched-listings/router";
import { unmatchedListingsRouter } from "./routers/unmatched-listings/router";
import { pubSubRouter } from "./routers/pubsub/router";
import { authRouter } from "./routers/auth/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  email: emailRouter,
  hotel: hotelRouter,
  promotion: promotionRouter,
  matchedListings: matchedListingsRouter,
  unmatchedListings: unmatchedListingsRouter,
  pubSub: pubSubRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
