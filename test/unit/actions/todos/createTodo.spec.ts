import { createTodo } from "@/actions/todos/createTodo";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aUser } from "@/test/fixtures/user.fixture";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache");

describe("create todo action", () => {
  it.each`
    data
    ${{}}
    ${{ todoId: undefined }}
    ${{ todoId: "" }}
    ${{ todoId: "1" }}
    ${{ todoId: "-1" }}
    ${{ todoId: "invalid" }}
  `("returns an error when form data is invalid", async ({ data }) => {
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: 1 });
    await expect(createTodo(formData(data))).rejects.toThrow();
  });

  it("creates a todo when the form data is valid and the user is authenticated", async () => {
    const user = aUser({ todos: [] });
    const newTodo = "New todo";
    const index = 1;
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId: user.id });

    await createTodo(formData({ content: newTodo, index: index.toString() }));
    expect(usersRepository.saveTodo).toHaveBeenCalledWith({ userId: user.id, content: newTodo, index });
    expect(webCache.revalidatePath).toHaveBeenCalledWith("/todos");
  });
});
