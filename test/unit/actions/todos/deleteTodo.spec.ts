import { deleteTodo } from "@/actions/todos/deleteTodo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache");

describe("delete todo action", () => {
  it.each`
    data
    ${{ todoId: "1" }}
    ${{ userId: undefined, todoId: "1" }}
    ${{ userId: "", todoId: "1" }}
    ${{ userId: "-1", todoId: "1" }}
    ${{ userId: "invalid", todoId: "1" }}
    ${{ userId: "1" }}
    ${{ userId: "1", todoId: undefined }}
    ${{ userId: "1", todoId: "" }}
    ${{ userId: "1", todoId: "-1" }}
    ${{ userId: "1", todoId: "invalid" }}
  `("returns an error when the command is invalid", async ({ data }) => {
    await expect(deleteTodo(data)).rejects.toThrow();
  });

  it("calls repository to delete a todo when the command is valid", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    await deleteTodo({ userId: user.id, todoId: todo.id });
    expect(usersRepository.deleteTodo).toHaveBeenCalledWith(user.id, todo.id);
    expect(webCache.revalidatePath).toHaveBeenCalledWith(`users/${user.id}`);
  });
});
