import authService from "@/modules/domain/shared/authService";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const getUser = async (): Promise<Optional<User>> => {
  const session = await authService.verifySession();

  return usersRepository.get(session.userId).then((user) => {
    if (user) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        todos: user.todos,
      };
    }
  });
};
