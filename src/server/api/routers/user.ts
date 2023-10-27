import { z } from "zod";
import { userSchema } from "~/schema/user";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";



export const userRouter = createTRPCRouter({
  getAll: publicProcedure.output(z.array(userSchema)).query(() => {
    return fetch("http://localhost:3000/").then((res) => res.json());
  }),
});
