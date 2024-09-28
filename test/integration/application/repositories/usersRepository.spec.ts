import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { usersTestRepository } from "@/test/integration/application/repositories/usersTestRepository";

describe("Users repository", () => {
  it("can find a user by id", async () => {
    const todo1 = aTodo({ id: 1, content: "Buy milk" });
    const todo2 = aTodo({ id: 2, content: "Buy bread" });
    const user = aUser({
      id: 1,
      name: "David",
      todos: [todo1, todo2].reverse(),
    });

    await usersTestRepository.save(user);
    const fetchedUser = await usersTestRepository.findById(user.id);

    expect(fetchedUser).toEqual(user);
  });

  it("can save a todo successfully", async () => {
    const newTodo = aTodo({ id: undefined });
    const user = aUser({ id: 2, name: "Sarah", todos: [] });
    await usersTestRepository.save(user);

    await usersTestRepository.saveTodo(user.id, newTodo.content);

    const fetchedUser = await usersTestRepository.findById(user.id);

    expect(fetchedUser?.todos).toContainEqual(
      expect.objectContaining({
        content: newTodo.content,
        id: expect.any(Number),
      })
    );
  });
});
