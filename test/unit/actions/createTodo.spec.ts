import { createTodo } from "@/actions/createTodo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { aUser } from "@/test/fixtures/user.fixture";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/modules/infrastructure/repositories/usersDBRepository");
vi.mock("@/modules/infrastructure/web/webCache", () => ({ webCache: { revalidatePath: vi.fn() } }));

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
    const user = aUser();
    const newTodo = "New todo";

    await createTodo(formData({ userId: user.id.toString(), todo: newTodo }));
    expect(usersRepository.saveTodo).toHaveBeenCalledWith(user.id, newTodo);

    expect(webCache.revalidatePath).toHaveBeenCalledWith(`users/${user.id}`);
  });
});
