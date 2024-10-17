import { UserId } from "@/modules/domain/user";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const getUser = (userId: UserId) => {
  return usersRepository.get(userId);
};
