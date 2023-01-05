import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  addCategory: protectedProcedure
    .input(
      z.object({
        categoryName: z.string(),
        categoryColor: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      console.log(input);
      const userId = ctx.session.user.id;

      return ctx.prisma.categories.create({
        data: {
          userId,
          ...input,
        },
      });
    }),
});
