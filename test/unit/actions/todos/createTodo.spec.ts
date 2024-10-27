import { createTodo } from "@/actions/todos/createTodo";
import { verifySession } from "@/authentication";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aUser } from "@/test/fixtures/user.fixture";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/authentication");
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
    await expect(createTodo(formData(data))).rejects.toThrow();
  });

  it("creates a todo when the form data is valid and the user is authenticated", async () => {
    const user = aUser();
    const newTodo = "New todo";
    vi.mocked(verifySession).mockResolvedValueOnce({ userId: user.id });

    await createTodo(formData({ content: newTodo }));
    expect(usersRepository.saveTodo).toHaveBeenCalledWith(user.id, newTodo);
    expect(webCache.revalidatePath).toHaveBeenCalledWith(`users/${user.id}`);
  });
});
