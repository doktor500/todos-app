import { UserDTO, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const getUser = (userId: UserId): Promise<Optional<UserDTO>> => {
  return usersRepository.get(userId).then((user) => {
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
