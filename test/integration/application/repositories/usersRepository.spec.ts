import { fakeUsersRepository } from "@/fakes/modules/infrastructure/repositories/usersRepository";
import { hash } from "@/modules/domain/utils/encryptionUtils";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser, userWithoutPassword } from "@/test/fixtures/user.fixture";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";
import { usersTestRepository } from "@/test/integration/application/repositories/usersTestRepository";

describe("Users repository", () => {
  beforeAll(() => usersTestRepository.deleteAll());

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can get a user by id", async ({ repository }) => {
    const todo1 = aTodo({ content: "Buy milk", index: 1 });
    const todo2 = aTodo({ content: "Buy bread", index: 2 });
    const user = aUser({ id: randomDataGenerator.aNumber(), todos: [todo1, todo2], password: "password" });
    const expectedUser = { ...user, todos: [todo2, todo1] };

    await repository.save(user);
    const fetchedUser = await repository.get(user.id);

    expect(fetchedUser).toEqual(userWithoutPassword(expectedUser));
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can get a user by email and password", async ({ repository }) => {
    const hashedPassword = await hash("password");
    const user = aUser({ id: randomDataGenerator.aNumber(), password: hashedPassword });

    await repository.save(user);
    const userId = await repository.getUserIdBy({ email: user.email, hashedPassword });

    expect(userId).toEqual(user.id);
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can create a user", async ({ repository }) => {
    const user = { username: "james", email: "james@email.com", password: "password" };

    const id = await repository.createUser({
      username: user.username,
      email: user.email,
      hashedPassword: user.password,
    });
    const fetchedUser = await repository.get(id);
    const expectedUser = aUser({ ...user, id, todos: [] });

    expect(fetchedUser).toEqual(userWithoutPassword(expectedUser));
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can save a todo successfully", async ({ repository }) => {
    const newTodo = "New todo";
    const index = 1;
    const user = aUser({ id: 2, username: "sarah", todos: [], password: "password" });
    await repository.save(user);

    await repository.saveTodo({ userId: user.id, content: newTodo, index });

    const fetchedUser = await repository.get(user.id);

    expect(fetchedUser?.todos).toContainEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: newTodo,
        completed: false,
        index,
      })
    );
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can update a todo successfully", async ({ repository }) => {
    const todo = aTodo({ completed: false, content: "original content", index: 1 });
    const user = aUser({ todos: [todo], password: "password" });
    const newTodoContent = "new content";
    await repository.save(user);

    await repository.updateTodo({ userId: user.id, todo: { id: todo.id, completed: true, content: newTodoContent } });
    const existingUserWithUpdatedTodo = await repository.get(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(
      expect.objectContaining({
        id: todo.id,
        content: newTodoContent,
        completed: true,
        index: 1,
      })
    );
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can delete a todo successfully", async ({ repository }) => {
    const todo = aTodo();
    const user = aUser({ todos: [todo], password: "password" });
    await repository.save(user);

    await repository.deleteTodo({ userId: user.id, todoId: todo.id });
    const existingUserWithDeletedTodo = await repository.get(user.id);

    expect(existingUserWithDeletedTodo?.todos).toEqual([]);
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can update a list of todos successfully", async ({ repository }) => {
    const todo1 = aTodo({ completed: false, content: "A", index: 1 });
    const todo2 = aTodo({ completed: false, content: "B", index: 2 });
    const user = aUser({ todos: [todo1, todo2], password: "password" });
    const updatedTodo1 = { ...todo1, index: 2 };
    const updatedTodo2 = { ...todo2, index: 1 };

    await repository.save(user);

    await repository.sortTodos({ userId: user.id, todos: [updatedTodo1, updatedTodo2] });
    const existingUserWithUpdatedTodo = await repository.get(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(expect.objectContaining({ id: todo1.id, index: 2 }));
    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(expect.objectContaining({ id: todo2.id, index: 1 }));
  });
});
