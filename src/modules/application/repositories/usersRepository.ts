import { ExistingTodo, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";

interface UsersRepository {
  get(userId: UserId): Promise<Optional<User>>;
  saveTodo(userId: UserId, content: string): Promise<void>;
  updateTodo(userId: UserId, todo: ExistingTodo): Promise<void>;
  deleteTodo(userId: UserId, todoId: TodoId): Promise<void>;
}

export default UsersRepository;
