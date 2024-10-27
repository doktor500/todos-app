import UsersRepository, { ExistingTodo } from "@/modules/application/repositories/usersRepository";
import { Todo, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { replace, sort } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { uuid } from "@/modules/domain/utils/uniqueIdGenerator";
import { userWithoutPassword } from "@/test/fixtures/user.fixture";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";
import { fakePersistentRepository } from "@/test/utils/repositories/persistentRepository";

export const fakeUsersRepository = () => {
  const repository = fakePersistentRepository<User>({ name: "users" });

  return {
    ...repository,
    get: async (userId: UserId): Promise<Optional<User>> => {
      const user = await repository.get(userId);
      if (user) {
        const todos = sort(user.todos).by("createdAt").reverse();

        return { ...userWithoutPassword(user), todos };
      }
    },
    createUser: async (username: string, email: string) => {
      const id = randomDataGenerator.aNumber();
      await repository.save({ id, username, email, todos: [] });

      return id;
    },
    saveTodo: async (userId: UserId, content: string): Promise<void> => {
      const user = await repository.get(userId);
      if (user) {
        const todo: Todo = { id: uuid(), content, completed: false, createdAt: new Date() };
        const updatedUser: User = { ...user, todos: [...user.todos, todo] };
        await repository.save(updatedUser);
      }
    },
    updateTodo: async (userId: UserId, todo: ExistingTodo): Promise<void> => {
      const user = await repository.get(userId);
      if (user) {
        const updatedTodos = updateUserTodo(user, todo);
        await repository.save({ ...user, todos: updatedTodos });
      }
    },
    deleteTodo: async (userId: UserId, todoId: TodoId): Promise<void> => {
      const user = await repository.get(userId);
      if (user) {
        const updatedUser = { ...user, todos: user.todos.filter((todo) => todo.id !== todoId) };
        await repository.save(updatedUser);
      }
    },
  };
};

const updateUserTodo = (user: User, todo: ExistingTodo) => {
  const currentTodo = user.todos.find(({ id: todoId }) => todoId === todo.id);

  return currentTodo
    ? replace(currentTodo)
        .in(user.todos)
        .with({ ...currentTodo, ...todo })
    : user.todos;
};

export const usersRepository = fakeUsersRepository() satisfies UsersRepository;
