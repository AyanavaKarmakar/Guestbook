import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

/**
 * @see https://www.nexxel.dev/blog/ct3a-guestbook
 */
export const guestbookRouter = router({
  /**
   * ? Query to get all messages in the guestbook
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany({
        select: {
          id: true,
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  /**
   * ? Query to create a new entry (row) in the guestbook
   */
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  /**
   * ? Query to delete message
   */
  deleteMessage: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.delete({
          where: {
            id: input,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
