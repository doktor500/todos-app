"use server";

import bcrypt from "bcrypt";

import { CreateUserData, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const createUser = async (data: CreateUserData) => {
  const result = createUserSchema.safeParse(data);
  if (!result.success) return { errors: result.error.flatten() };

  const { username, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await usersRepository.createUser(username.toLowerCase(), email.toLowerCase(), hashedPassword);
};
