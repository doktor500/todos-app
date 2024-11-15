import { toggleTodo } from "@/actions/todos/toggleTodo";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache");

describe("toggle todo action", () => {
  it.each`
    data
    ${{ completed: true }}
    ${{ todoId: undefined, completed: true }}
    ${{ todoId: "", completed: true }}
    ${{ todoId: "1", completed: true }}
    ${{ todoId: "-1", completed: true }}
    ${{ todoId: "invalid", completed: true }}
  `("returns an error when the command is invalid", async ({ data }) => {
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: 1 });
    await expect(toggleTodo(data)).rejects.toThrow();
  });

  it("toggles a todo when the command is valid and the user is authenticated", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: user.id });

    await toggleTodo({ todoId: todo.id, completed: true });
    expect(usersRepository.updateTodo).toHaveBeenCalledWith({
      userId: user.id,
      todo: { id: todo.id, completed: true },
    });
    expect(webCache.revalidatePath).toHaveBeenCalledWith("/todos");
  });
});
