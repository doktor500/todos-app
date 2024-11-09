"use server";

import { LoginUserData, LoginUserErrors, loginUserSchema } from "@/actions/user/schemas/loginUserSchema";
import authService from "@/modules/domain/shared/authService";
import { hash } from "@/modules/domain/utils/encryptionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const loginUser = async (data: LoginUserData): Promise<Optional<LoginUserErrors>> => {
  const result = loginUserSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const { email, password } = result.data;
  const hashedPassword = await hash(password);

  const userId = await usersRepository.getUserIdBy({ email: email.toLowerCase(), hashedPassword });

  if (userId) await authService.createSession(userId);
  // @TODO handle user not found error
};
