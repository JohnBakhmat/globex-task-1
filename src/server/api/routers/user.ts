import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const userSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  position_name: z.string(),
  department: z.string(),
  hire_date: z.string(),
});

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.output(z.array(userSchema)).query(() => {
    return fetch("http://localhost:3000/").then((res) => res.json());
  }),
});
