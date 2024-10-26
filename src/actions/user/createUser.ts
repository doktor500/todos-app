"use server";

import bcrypt from "bcrypt";

import { CreateUserData, CreateUserErrors, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import { UserId } from "@/modules/domain/user";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const createUser = async (data: CreateUserData): Promise<CreateUserErrors | UserId> => {
  const result = createUserSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const { username, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  return usersRepository.createUser(username.toLowerCase(), email.toLowerCase(), hashedPassword);
};
