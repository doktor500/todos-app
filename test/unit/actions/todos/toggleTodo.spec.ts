import { toggleTodo } from "@/actions/todos/toggleTodo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache", () => ({ webCache: { revalidatePath: vi.fn() } }));

describe("toggle todo action", () => {
  it.each`
    data
    ${{ todoId: "1", completed: true }}
    ${{ userId: undefined, todoId: "1", completed: true }}
    ${{ userId: "", todoId: "1", completed: true }}
    ${{ userId: "-1", todoId: "1", completed: true }}
    ${{ userId: "invalid", todoId: "1", completed: true }}
    ${{ userId: "1", completed: true }}
    ${{ userId: "1", todoId: undefined, completed: true }}
    ${{ userId: "1", todoId: "", completed: true }}
    ${{ userId: "1", todoId: "-1", completed: true }}
    ${{ userId: "1", todoId: "invalid", completed: true }}
  `("returns an error when the command is invalid", async ({ data }) => {
    await expect(toggleTodo(data)).rejects.toThrow();
  });

  it("calls repository to toggle a todo when the command is valid", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });

    await toggleTodo({ userId: user.id, todoId: todo.id, completed: true });
    expect(usersRepository.updateTodo).toHaveBeenCalledWith(user.id, { id: todo.id, completed: true });
    expect(webCache.revalidatePath).toHaveBeenCalledWith(`users/${user.id}`);
  });
});
