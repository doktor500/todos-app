import { editTodo } from "@/actions/editTodo";
import { todosRepository } from "@/modules/infrastructure/repositories/todosDBRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/infrastructure/repositories/todosDBRepository");

describe("edit todo action", () => {
  it.each`
    data
    ${{ todoId: "1", content: "new-content" }}
    ${{ userId: undefined, todoId: "1", content: "new-content" }}
    ${{ userId: "", todoId: "1", content: "new-content" }}
    ${{ userId: "-1", todoId: "1", content: "new-content" }}
    ${{ userId: "invalid", todoId: "1", content: "new-content" }}
    ${{ userId: "1", content: "new-content" }}
    ${{ userId: "1", todoId: undefined, content: "new-content" }}
    ${{ userId: "1", todoId: "", content: "new-content" }}
    ${{ userId: "1", todoId: "-1", content: "new-content" }}
    ${{ userId: "1", todoId: "invalid", content: "new-content" }}
  `("returns an error when the command is invalid", async ({ data }) => {
    await expect(editTodo(data)).rejects.toThrow();
  });

  it("calls repository to edit a todo when the command is valid", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    const content = "New content";

    await editTodo({ userId: user.id, todoId: todo.id, content });
    expect(todosRepository.update).toHaveBeenCalledWith({ id: todo.id, content });
  });
});
