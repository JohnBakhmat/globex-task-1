import {z} from "zod";

export const userSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    position_name: z.string(),
    department: z.string(),
    hire_date: z.string(),
  });

export type UserType = z.infer<typeof userSchema>;