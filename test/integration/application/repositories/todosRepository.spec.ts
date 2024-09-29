import { todosRepository } from "@/modules/infrastructure/repositories/todosDBRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { usersTestRepository } from "@/test/integration/application/repositories/usersTestRepository";

describe("Todos repository", () => {
  it("can update a todo successfully", async () => {
    const todo = aTodo({ id: undefined, completed: false, content: "original content" });
    const user = aUser({ todos: [todo] });
    const newTodoContent = "new content";
    await usersTestRepository.save(user);

    const existingUser = await usersTestRepository.findById(user.id);
    const todoId = existingUser!.todos.at(0)!.id;

    await todosRepository.update({ id: todoId, completed: true, content: newTodoContent });

    const existingUserWithUpdatedTodo = await usersTestRepository.findById(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toContainEqual(
      expect.objectContaining({
        id: todoId,
        content: newTodoContent,
        completed: true,
      })
    );
  });

  it("can delete a todo successfully", async () => {
    const todo = aTodo({ id: undefined, completed: false });
    const user = aUser({ todos: [todo] });
    await usersTestRepository.save(user);

    const existingUser = await usersTestRepository.findById(user.id);
    const todoId = existingUser!.todos.at(0)!.id;

    await todosRepository.delete(todoId);

    const existingUserWithUpdatedTodo = await usersTestRepository.findById(user.id);

    expect(existingUserWithUpdatedTodo?.todos).toEqual([]);
  });
});
