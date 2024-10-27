"use server";

import bcrypt from "bcrypt";

import { CreateUserData, CreateUserErrors, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import { createSession } from "@/authentication";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const createUser = async (data: CreateUserData): Promise<Optional<CreateUserErrors>> => {
  const result = createUserSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const { username, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await usersRepository.createUser(username.toLowerCase(), email.toLowerCase(), hashedPassword);
  await createSession(userId);
};
