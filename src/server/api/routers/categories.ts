import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const categoriesRouter = createTRPCRouter({
  getAllCategories: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.categories.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  addCategory: protectedProcedure
    .input(
      z.object({
        categoryName: z.string(),
        categoryColor: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.categories.create({
        data: {
          userId,
          ...input,
        },
      });
    }),

  removeCategory: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await prisma?.$transaction([
        ctx.prisma.categories.delete({
          where: {
            id: input,
          },
        }),
        ctx.prisma.expenses.updateMany({
          data: {
            categoryId: null,
          },
          where: {
            categoryId: input,
            userId: ctx.session.user.id,
          },
        }),
      ]);
    }),
});
