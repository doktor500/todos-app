import { ExistingTodo, TodoEntry, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";

interface UsersRepository {
  get(userId: UserId): Promise<Optional<User>>;
  getUserIdBy({ email, hashedPassword }: { email: string; hashedPassword: string }): Promise<Optional<UserId>>;
  createUser(user: { username: string; email: string; hashedPassword: string }): Promise<UserId>;
  saveTodo({ userId, content, index }: { userId: UserId; content: string; index: number }): Promise<void>;
  updateTodo({ userId, todo }: { userId: UserId; todo: ExistingTodo }): Promise<void>;
  deleteTodo({ userId, todoId }: { userId: UserId; todoId: TodoId }): Promise<void>;
  sortTodos({ userId, todos }: { userId: UserId; todos: TodoEntry[] }): Promise<void>;
}

export default UsersRepository;
