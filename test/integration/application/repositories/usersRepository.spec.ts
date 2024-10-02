import { FakeUsersRepository } from "@/fakes/modules/infrastructure/repositories/usersRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { usersTestRepository } from "@/test/integration/application/repositories/usersTestRepository";

describe("Users repository", () => {
  beforeAll(() => usersTestRepository.deleteAll());

  it.each`
    name                                  | repository
    ${"fake in memory users repository"}  | ${new FakeUsersRepository({ persistent: false })}
    ${"fake persistent users repository"} | ${new FakeUsersRepository({ persistent: true })}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can find a user by id", async ({ repository }) => {
    const todo1 = aTodo({ id: 1, content: "Buy milk" });
    const todo2 = aTodo({ id: 2, content: "Buy bread" });
    const user = aUser({ id: 1, name: "David", todos: [todo1, todo2].reverse() });

    await repository.save(user);
    const fetchedUser = await repository.get(user.id);

    expect(fetchedUser).toEqual(user);
  });

  it.each`
    name                                  | repository
    ${"fake in memory users repository"}  | ${new FakeUsersRepository({ persistent: false })}
    ${"fake persistent users repository"} | ${new FakeUsersRepository({ persistent: true })}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can save a todo successfully", async ({ repository }) => {
    const newTodo = aTodo({ id: undefined });
    const user = aUser({ id: 2, name: "Sarah", todos: [] });
    await repository.save(user);

    await repository.saveTodo(user.id, newTodo.content);

    const fetchedUser = await repository.get(user.id);

    expect(fetchedUser?.todos).toContainEqual(
      expect.objectContaining({ content: newTodo.content, id: expect.any(Number) })
    );
  });

  it.each`
    name                                  | repository
    ${"fake in memory users repository"}  | ${new FakeUsersRepository({ persistent: false })}
    ${"fake persistent users repository"} | ${new FakeUsersRepository({ persistent: true })}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can update a todo successfully", async ({ repository }) => {
    const todo = aTodo({ id: undefined, completed: false, content: "original content" });
    const user = aUser({ todos: [todo] });
    const newTodoContent = "new content";
    await repository.save(user);

    const existingUser = await repository.get(user.id);
    const todoId = existingUser!.todos.at(0)!.id;

    await repository.updateTodo(user.id, { id: todoId, completed: true, content: newTodoContent });

    const existingUserWithUpdatedTodo = await repository.get(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(
      expect.objectContaining({
        id: todoId,
        content: newTodoContent,
        completed: true,
      })
    );
  });

  it.each`
    name                                  | repository
    ${"fake in memory users repository"}  | ${new FakeUsersRepository({ persistent: false })}
    ${"fake persistent users repository"} | ${new FakeUsersRepository({ persistent: true })}
    ${"users repository"}                 | ${usersTestRepository}
  `("$name can delete a todo successfully", async ({ repository }) => {
    const todo = aTodo({ id: undefined, completed: false });
    const user = aUser({ todos: [todo] });
    await repository.save(user);

    const existingUser = await repository.get(user.id);
    const todoId = existingUser!.todos.at(0)!.id;

    await repository.deleteTodo(user.id, todoId);

    const existingUserWithUpdatedTodo = await repository.get(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toEqual([]);
  });
});
