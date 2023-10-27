import { z } from "zod";
import { userSchema } from "~/schema/user";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.string().optional())
    .output(z.array(userSchema))
    .mutation(async ({ input }) => {
      const query = input ? `?term=${input}` : "";
      return fetch(`http://localhost:3000/${query}`).then((res) => res.json());
    }),
});
