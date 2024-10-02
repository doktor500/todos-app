import { ExistingTodo } from "@/modules/domain/todo";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";

interface UsersRepository {
  get(userId: number): Promise<Optional<User>>;
  saveTodo(userId: number, content: string): Promise<void>;
  updateTodo(userId: number, todo: ExistingTodo): Promise<void>;
  deleteTodo(userId: number, todoId: number): Promise<void>;
}

export default UsersRepository;
