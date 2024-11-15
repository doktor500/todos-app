import { editTodo } from "@/actions/todos/editTodo";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache");

describe("edit todo action", () => {
  it.each`
    data
    ${{ content: "new-content" }}
    ${{ todoId: undefined, content: "new-content" }}
    ${{ todoId: "", content: "new-content" }}
    ${{ todoId: "1", content: "new-content" }}
    ${{ todoId: "-1", content: "new-content" }}
    ${{ todoId: "invalid", content: "new-content" }}
  `("returns an error when the command is invalid", async ({ data }) => {
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: 1 });
    await expect(editTodo(data)).rejects.toThrow();
  });

  it("edits a todo when the command is valid and the user is authenticated", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    const content = "New content";
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: user.id });

    await editTodo({ todoId: todo.id, content });
    expect(usersRepository.updateTodo).toHaveBeenCalledWith({ userId: user.id, todo: { id: todo.id, content } });
    expect(webCache.revalidatePath).toHaveBeenCalledWith("/todos");
  });
});
