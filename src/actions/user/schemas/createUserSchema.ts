import * as z from "zod";

export type CreateUserData = z.infer<typeof createUserSchema>;
export type CreateUserErrors = z.inferFlattenedErrors<typeof createUserSchema>;

export const createUserSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
