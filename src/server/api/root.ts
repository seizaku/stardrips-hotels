import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { promotionRouter } from "./routers/promos/router";
import { hotelMetricsRouter } from "~/server/api/routers/hotel-metrics/router";
import { emailRouter } from "./routers/emails/router";
import { listingsRouter } from "~/server/api/routers/listings/router";
import { pubSubRouter } from "./routers/pubsub/router";
import { authRouter } from "./routers/auth/router";
import { hotelRouter } from "~/server/api/routers/hotels/router";
import { matchListingRouter } from "./routers/match-listings/router";
import { metadataRouter } from "./routers/metadata/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.hotelRouter
 */
export const appRouter = createTRPCRouter({
  email: emailRouter,
  hotelMetrics: hotelMetricsRouter,
  matchListings: matchListingRouter,
  hotels: hotelRouter,
  metadata: metadataRouter,
  promotion: promotionRouter,
  listings: listingsRouter,
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
