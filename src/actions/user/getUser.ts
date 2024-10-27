import { UserDTO } from "@/modules/domain/user";
import { verifySession } from "@/modules/domain/utils/auth";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const getUser = async (): Promise<Optional<UserDTO>> => {
  const session = await verifySession();

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
