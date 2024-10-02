import UsersRepository from "@/modules/application/repositories/usersRepository";
import { ExistingTodo } from "@/modules/domain/todo";
import { User } from "@/modules/domain/user";
import { isEmpty, replace, sort } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { FakeRepository } from "@/test/utils/repositories/fakeRepository";

export class FakeUsersRepository extends FakeRepository<User> implements UsersRepository {
  constructor({ persistent = false }: { persistent?: boolean } = {}) {
    super({ persistent, name: "users" });
  }

  async get(userId: number): Promise<Optional<User>> {
    const user = await this.repository.get(userId);
    if (user) {
      return { ...user, todos: sort(user.todos).by("id").reverse() };
    }
  }

  async saveTodo(userId: number, content: string): Promise<void> {
    const user = await this.repository.get(userId);
    if (user) {
      const lastId = isEmpty(user.todos) ? 0 : Math.max(...user.todos.map((todo) => todo.id));
      const todo = { id: lastId + 1, content, completed: false };
      const updatedUser: User = { ...user, todos: [...user.todos, todo] };
      await this.repository.save(updatedUser);
    }
  }

  async updateTodo(userId: number, todo: ExistingTodo): Promise<void> {
    const user = await this.repository.get(userId);
    if (user) {
      const updatedTodos = this.updateUserTodo(user, todo);
      await this.repository.save({ ...user, todos: updatedTodos });
    }
  }

  async deleteTodo(userId: number, todoId: number): Promise<void> {
    const user = await this.repository.get(userId);
    if (user) {
      const updatedUser = { ...user, todos: user.todos.filter((todo) => todo.id !== todoId) };
      await this.repository.save(updatedUser);
    }
  }

  private updateUserTodo(user: User, todo: ExistingTodo) {
    const currentTodo = user?.todos.find(({ id }) => id === todo.id);

    return currentTodo
      ? replace(currentTodo)
          .in(user.todos)
          .with({ ...currentTodo, ...todo })
      : user.todos;
  }
}

export const usersRepository = new FakeUsersRepository({ persistent: true });
