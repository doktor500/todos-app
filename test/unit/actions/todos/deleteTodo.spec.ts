import { deleteTodo } from "@/actions/todos/deleteTodo";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache");

describe("delete todo action", () => {
  it.each`
    data
    ${{}}
    ${{ todoId: undefined }}
    ${{ todoId: "" }}
    ${{ todoId: "1" }}
    ${{ todoId: "-1" }}
    ${{ todoId: "invalid" }}
  `("returns an error when the command is invalid", async ({ data }) => {
    await expect(deleteTodo(data)).rejects.toThrow();
  });

  it("deletes a todo when the command is valid and the user is authenticated", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: user.id });

    await deleteTodo({ todoId: todo.id });
    expect(usersRepository.deleteTodo).toHaveBeenCalledWith(user.id, todo.id);
    expect(webCache.revalidatePath).toHaveBeenCalledWith(`users/${user.id}`);
  });
});
