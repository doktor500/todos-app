import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";

interface UsersRepository {
  findById(userId: number): Promise<Optional<User>>;
  saveTodo(userId: number, content: string): Promise<void>;
}

export default UsersRepository;
