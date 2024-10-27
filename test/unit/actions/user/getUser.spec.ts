import { getUser } from "@/actions/user/getUser";
import { verifySession } from "@/modules/domain/utils/auth";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser, aUserDto } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/modules/domain/utils/auth");

describe("get user action", () => {
  it("when the user is authenticated, finds user in repository and returns the user without password", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    const userWithoutPassword = aUserDto(user);
    vi.mocked(verifySession).mockResolvedValueOnce({ userId: user.id });
    vi.mocked(usersRepository).get.mockResolvedValueOnce(user);

    const retrievedUser = await getUser();
    expect(userWithoutPassword).toEqual(retrievedUser);
  });
});
