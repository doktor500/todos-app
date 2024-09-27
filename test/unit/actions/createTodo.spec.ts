import { createTodo } from "@/actions/createTodo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";
import { formData } from "@/test/unit/utils/formDataUtils";
import { webCache } from "@/web/webCache";

vi.mock("@/modules/infrastructure/repositories/usersDBRepository");
vi.mock("@/web/webCache", () => ({ webCache: { revalidatePath: vi.fn() } }));

describe("create todo action", () => {
  it.each`
    data
    ${{ todo: "new-todo" }}
    ${{ userId: undefined, todo: "New todo" }}
    ${{ userId: "", todo: "New todo" }}
    ${{ userId: "-1", todo: "New todo" }}
    ${{ userId: "invalid", todo: "New todo" }}
    ${{ userId: "1" }}
    ${{ userId: "1", todo: undefined }}
    ${{ userId: "1", todo: "" }}
    ${{ userId: "1", todo: "-".repeat(100) }}
  `("returns an error when form data is invalid", async ({ data }) => {
    await expect(createTodo(formData(data))).rejects.toThrow();
  });

  it("calls repository to create a todo when the form data is valid", async () => {
    const userId = 1;
    const todo = "New todo";

    await createTodo(formData({ userId: userId.toString(), todo }));
    expect(usersRepository.saveTodo).toHaveBeenCalledWith(userId, todo);

    expect(webCache.revalidatePath).toHaveBeenCalledWith(`users/${userId}`);
  });
});
