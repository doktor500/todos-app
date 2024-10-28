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
    const todo1 = aTodo({ content: "Buy milk", createdAt: new Date("01/01/2024") });
    const todo2 = aTodo({ content: "Buy bread", createdAt: new Date("02/01/2024") });
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

    const id = await repository.createUser(user.username, user.email, user.password);
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
    const user = aUser({ id: 2, username: "sarah", todos: [], password: "password" });
    await repository.save(user);

    await repository.saveTodo(user.id, newTodo);

    const fetchedUser = await repository.get(user.id);

    expect(fetchedUser?.todos).toContainEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: newTodo,
        completed: false,
        createdAt: expect.any(Date),
      })
    );
  });

  it.each`
    name                                  | repository
    ${"fake persistent users repository"} | ${fakeUsersRepository()}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can update a todo successfully", async ({ repository }) => {
    const todo = aTodo({ completed: false, content: "original content" });
    const user = aUser({ todos: [todo], password: "password" });
    const newTodoContent = "new content";
    await repository.save(user);

    await repository.updateTodo(user.id, { id: todo.id, completed: true, content: newTodoContent });
    const existingUserWithUpdatedTodo = await repository.get(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(
      expect.objectContaining({
        id: todo.id,
        content: newTodoContent,
        completed: true,
        createdAt: todo.createdAt,
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

    await repository.deleteTodo(user.id, todo.id);
    const existingUserWithDeletedTodo = await repository.get(user.id);

    expect(existingUserWithDeletedTodo?.todos).toEqual([]);
  });
});
