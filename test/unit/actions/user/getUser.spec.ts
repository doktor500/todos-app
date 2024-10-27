import { getUser } from "@/actions/user/getUser";
import { verifySession } from "@/authentication";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";

vi.mock("@/authentication");
vi.mock("@/modules/infrastructure/repositories/usersRepository");

describe("get user action", () => {
  it("when the user is authenticated, finds user in repository and returns the user without password", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    vi.mocked(verifySession).mockResolvedValueOnce({ userId: user.id });
    vi.mocked(usersRepository).get.mockResolvedValueOnce(user);

    const retrievedUser = await getUser();
    expect(user).toEqual(retrievedUser);
  });
});
