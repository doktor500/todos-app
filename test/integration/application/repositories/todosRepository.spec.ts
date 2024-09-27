import { todosRepository } from "@/modules/infrastructure/repositories/todosDBRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { usersTestRepository } from "@/test/repositories/usersTestRepository";

describe("Todos repository", () => {
  it("can update a todo successfully", async () => {
    const todo = aTodo({ id: undefined, completed: false });
    const user = aUser({ todos: [todo] });
    await usersTestRepository.save(user);

    const existingUser = await usersTestRepository.findById(user.id);
    const todoId = existingUser!.todos.at(0)!.id;

    await todosRepository.update({ todoId, completed: true });

    const existingUserWithUpdatedTodo = await usersTestRepository.findById(
      user.id,
    );

    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(
      expect.objectContaining({
        id: todoId,
        content: todo.content,
        completed: true,
      }),
    );
  });

  it("can delete a todo successfully", async () => {
    const todo = aTodo({ id: undefined, completed: false });
    const user = aUser({ todos: [todo] });
    await usersTestRepository.save(user);

    const existingUser = await usersTestRepository.findById(user.id);
    const todoId = existingUser!.todos.at(0)!.id;

    await todosRepository.delete(todoId);

    const existingUserWithUpdatedTodo = await usersTestRepository.findById(
      user.id,
    );

    expect(existingUserWithUpdatedTodo?.todos).toEqual([]);
  });
});
