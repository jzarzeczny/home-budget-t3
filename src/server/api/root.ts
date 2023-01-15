import { createTRPCRouter } from "./trpc";
import { categoriesRouter } from "./routers/categories";
import { expensesRouter } from "./routers/expenses";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  expenses: expensesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
