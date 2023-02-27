import type { CategoriesWithValues } from 'types/Categories';
import { z } from 'zod';

import type { Categories, Expenses } from '@prisma/client';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const NO_CATEGORY = 'noCategory';

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
        createdAt: 'desc',
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
          createdAt: 'desc',
        },
        include: {
          category: true,
        },
      });

      const expenseCategories = reduceToUniqueCategories(data);

      const categories = expenseCategories.reduce(
        (acc: CategoriesWithValues, currentValue: Categories) => {
          return {
            ...acc,
            [currentValue.id]: { ...currentValue, value: 0 },
          };
        },
        {}
      );

      categories[NO_CATEGORY] = {
        id: NO_CATEGORY,
        categoryName: 'Brak kategorii',
        categoryColor: 'pink',
        userId: ctx.session.user.id,
        value: 0,
      };

      const expenses = data.map((expense) => {
        const id = expense.categoryId;
        const categoryWithoutId = categories[NO_CATEGORY];

        if (id) {
          const category = categories[id];
          if (category !== undefined) {
            category.value += expense.value;
          }
        }
        if (categoryWithoutId) {
          categoryWithoutId.value += expense.value;
        }

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

const reduceToUniqueCategories = (
  data: (Expenses & {
    category: Categories | null;
  })[]
): Categories[] => {
  const uniqueCategories = [
    ...new Set(data.map((expense) => expense.category)),
  ];
  return uniqueCategories.filter(notEmpty);
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}
