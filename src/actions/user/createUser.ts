"use server";

import { CreateUserErrors, createUserSchema } from "@/actions/user/schemas/createUserSchema";
import authService from "@/modules/domain/shared/authService";
import { hash } from "@/modules/domain/utils/encryptionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import appRouter, { Route } from "@/router/appRouter";

type State = {
  data: { username: Optional<string>; email: Optional<string>; password: Optional<string> };
  errors: CreateUserErrors["fieldErrors"];
};

const { HOME } = Route;

export const createUser = async (_state: Optional<State>, formData: FormData): Promise<State> => {
  const data = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const result = createUserSchema.safeParse(data);

  if (!result.success) return { data, errors: result.error.flatten().fieldErrors };

  const { username, email, password } = result.data;
  const user = { username: username.toLowerCase(), email: email.toLowerCase() };

  return hash(password)
    .then((hashedPassword) => usersRepository.createUser({ ...user, hashedPassword }))
    .then((userId) => authService.createSession(userId))
    .then(() => appRouter().redirectTo(HOME));
};
