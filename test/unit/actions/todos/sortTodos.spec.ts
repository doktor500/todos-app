import { sortTodos } from "@/actions/todos/sortTodos";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/infrastructure/web/webCache");

describe("sort todos action", () => {
  const userId = 1;

  it.each`
    data
    ${{}}
    ${{ todos: [] }}
    ${{ todos: [{ index: 1 }] }}
    ${{ todos: [{ id: undefined, index: 1 }] }}
    ${{ todos: [{ id: "", index: 1 }] }}
    ${{ todos: [{ id: "1", index: 1 }] }}
    ${{ todos: [{ id: "-1", index: 1 }] }}
    ${{ todos: [{ id: "invalid", index: 1 }] }}
    ${{ todos: [{ id: randomDataGenerator.anId() }] }}
    ${{ todos: [{ id: randomDataGenerator.anId(), index: undefined }] }}
    ${{ todos: [{ id: randomDataGenerator.anId(), index: -1 }] }}
    ${{ todos: [{ id: randomDataGenerator.anId(), index: 0 }] }}
    ${{ todos: [{ id: randomDataGenerator.anId(), index: "1" }] }}
  `("returns an error when the command is invalid", async ({ data }) => {
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId });
    await expect(sortTodos(data)).rejects.toThrow();
  });

  it("saves sorted todos when the user is authenticated", async () => {
    const data = { todos: [{ id: randomDataGenerator.anId(), index: 1 }] };
    vi.mocked(authService.verifySession).mockResolvedValueOnce({ userId });

    await sortTodos(data);
    expect(usersRepository.sortTodos).toHaveBeenCalledWith({ userId, todos: data.todos });
    expect(webCache.revalidatePath).toHaveBeenCalledWith("/todos");
  });
});
