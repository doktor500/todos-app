import { getUser } from "@/actions/user/getUser";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/infrastructure/repositories/usersRepository");

describe("get user action", () => {
  it("calls repository to get a user by id", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(usersRepository).get.mockResolvedValueOnce(user);

    const retrievedUser = await getUser(user.id);
    expect(user).toEqual(retrievedUser);
  });
});
