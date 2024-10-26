import { Todo, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";

export type ExistingTodo = Pick<Todo, "id"> & Partial<Todo>;

interface UsersRepository {
  get(userId: UserId): Promise<Optional<User>>;
  createUser(username: string, email: string, hashedPassword: string): Promise<UserId>;
  saveTodo(userId: UserId, content: string): Promise<void>;
  updateTodo(userId: UserId, todo: ExistingTodo): Promise<void>;
  deleteTodo(userId: UserId, todoId: TodoId): Promise<void>;
}

export default UsersRepository;
