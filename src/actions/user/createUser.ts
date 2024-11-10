"use server";

import { CreateUserErrors, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import authService from "@/modules/domain/shared/authService";
import { hash } from "@/modules/domain/utils/encryptionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import appRouter, { Route } from "@/router/appRouter";

type Errors = {
  errors: CreateUserErrors["fieldErrors"];
};

const { HOME } = Route;

export const createUser = async (_state: Optional<Errors>, formData: FormData): Promise<Optional<Errors>> => {
  const result = createUserSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  const { username, email, password } = result.data;
  const user = { username: username.toLowerCase(), email: email.toLowerCase() };

  return hash(password)
    .then((hashedPassword) => usersRepository.createUser({ ...user, hashedPassword }))
    .then((userId) => authService.createSession(userId))
    .then(() => appRouter().redirectTo(HOME));
};
