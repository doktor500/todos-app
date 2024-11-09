"use server";

import { LoginUserErrors, loginUserSchema } from "@/actions/user/schemas/loginUserSchema";
import authService from "@/modules/domain/shared/authService";
import { hash } from "@/modules/domain/utils/encryptionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import appRouter, { Route } from "@/router/appRouter";

type Errors = {
  errors: LoginUserErrors["fieldErrors"];
};

const { HOME } = Route;

export const loginUser = async (_state: Optional<Errors>, formData: FormData): Promise<Optional<Errors>> => {
  const result = loginUserSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  const { email, password } = result.data;
  const hashedPassword = await hash(password);

  const userId = await usersRepository.getUserIdBy({ email: email.toLowerCase(), hashedPassword });
  if (userId) await authService.createSession(userId).then(() => appRouter().redirectTo(HOME));

  return {
    errors: {
      email: ["Invalid email or password"],
      password: ["Invalid email or password"],
    },
  };
};
