import * as z from "zod";

export type LoginUserData = z.infer<typeof loginUserSchema>;
export type LoginUserErrors = z.inferFlattenedErrors<typeof loginUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
