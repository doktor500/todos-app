import UsersRepository from "@/modules/application/repositories/usersRepository";
import uniqueIdGenerator from "@/modules/domain/shared/uniqueIdGenerator";
import { ExistingTodo, Todo, TodoEntry, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { replace, sort } from "@/modules/domain/utils/collectionUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { userWithoutPassword } from "@/test/fixtures/user.fixture";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";
import { fakePersistentRepository } from "@/test/utils/repositories/persistentRepository";

export const fakeUsersRepository = () => {
  const repository = fakePersistentRepository<User>({ name: "users" });

  const get = async (userId: UserId): Promise<Optional<User>> => {
    const user = await repository.get(userId);
    if (user) {
      const todos = sort(user.todos).by("index").reverse();

      return { ...userWithoutPassword(user), todos };
    }
  };

  const getUserIdBy = async ({ email }: { email: string }): Promise<Optional<UserId>> => {
    const users = await repository.getAll();
    const user = users.find((user) => user.email === email);

    return user?.id;
  };

  const createUser = async (user: { username: string; email: string; hashedPassword: string }) => {
    const id = randomDataGenerator.aNumber();
    await repository.save({ id, username: user.username, email: user.email, todos: [] });

    return id;
  };

  const saveTodo = async (props: { userId: UserId; todoId: TodoId; content: string; index: number }): Promise<void> => {
    const { userId, todoId, content, index } = props;
    const user = await repository.get(userId);
    if (user) {
      const todo: Todo = { id: todoId ?? uniqueIdGenerator.uuid(), content, completed: false, index };
      const updatedUser: User = { ...user, todos: [...user.todos, todo] };
      await repository.save(updatedUser);
    }
  };

  const updateTodo = async ({ userId, todo }: { userId: UserId; todo: ExistingTodo }): Promise<void> => {
    const user = await repository.get(userId);
    if (user) {
      const updatedTodos = updateUserTodo(user, todo);
      await repository.save({ ...user, todos: updatedTodos });
    }
  };

  const deleteTodo = async ({ userId, todoId }: { userId: UserId; todoId: TodoId }): Promise<void> => {
    const user = await repository.get(userId);
    if (user) {
      const updatedUser = { ...user, todos: user.todos.filter((todo) => todo.id !== todoId) };
      await repository.save(updatedUser);
    }
  };

  const sortTodos = async ({ userId, todos }: { userId: UserId; todos: TodoEntry[] }): Promise<void> => {
    for (const todo of todos) {
      await updateTodo({ userId, todo });
    }
  };

  return {
    ...repository,
    get,
    getUserIdBy,
    createUser,
    saveTodo,
    updateTodo,
    deleteTodo,
    sortTodos,
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
