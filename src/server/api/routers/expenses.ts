import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const expensesRouter = createTRPCRouter({
  getAllExpenses: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.expenses.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  addExpense: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        contractor: z.string(),
        description: z.string(),
        categoryId: z.string(),
        transactionDate: z.date(),
        value: z.number(),
        currency: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.expenses.create({
        data: {
          userId,
          ...input,
        },
      });
    }),
});
