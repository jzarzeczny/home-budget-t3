import type { Categories } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

interface CategoriesWithValues extends Partial<Categories> {
  value: number;
}

export const expensesRouter = createTRPCRouter({
  getAllExpenses: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.expenses.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  expensesWithCategory: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.expenses.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
  }),

  getMonthlyExpenses: protectedProcedure
    .input(
      z.object({
        month: z.number(),
        year: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.expenses.findMany({
        where: {
          userId: ctx.session.user.id,
          transactionDate: {
            lte: new Date(`${input.year}-${input.month}-31`),
            gte: new Date(`${input.year}-${input.month}-01`),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      });
      const categories: any = [
        ...new Set(data.map((expense) => expense.category)),
      ].reduce((acc: any, cur: any) => {
        if (cur?.id) {
          return { ...acc, [cur?.id]: { ...cur, value: 0 } };
        }
      }, {} as CategoriesWithValues);
      const expenses = data.map((expense) => {
        categories[expense.categoryId].value += expense.value;
        return expense;
      });

      return { categories, expenses };
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
