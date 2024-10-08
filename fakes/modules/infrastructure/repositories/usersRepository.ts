import UsersRepository from "@/modules/application/repositories/usersRepository";
import { ExistingTodo, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { isEmpty, replace, sort } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { fakeRepository } from "@/test/utils/repositories/fakeRepository";

export const fakeUsersRepository = () => {
  const repository = fakeRepository<User>({ name: "users" });

  return {
    ...repository,
    get: async (userId: UserId): Promise<Optional<User>> => {
      const user = await repository.get(userId);
      if (user) {
        return { ...user, todos: sort(user.todos).by("id").reverse() };
      }
    },
    saveTodo: async (userId: UserId, content: string): Promise<void> => {
      const user = await repository.get(userId);
      if (user) {
        const lastId = isEmpty(user.todos) ? 0 : Math.max(...user.todos.map((todo) => todo.id));
        const todo = { id: lastId + 1, content, completed: false };
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
  const currentTodo = user.todos.find(({ id }) => id === todo.id);

  return currentTodo
    ? replace(currentTodo)
        .in(user.todos)
        .with({ ...currentTodo, ...todo })
    : user.todos;
};

export const usersRepository = fakeUsersRepository() satisfies UsersRepository;
