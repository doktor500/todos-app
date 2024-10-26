import { getUser } from "@/actions/user/getUser";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser, aUserDto } from "@/test/fixtures/user.fixture";

vi.mock("@/modules/infrastructure/repositories/usersRepository");

describe("get user action", () => {
  it("calls repository to get a user by id and returns the user without password", async () => {
    const todo = aTodo();
    const user = aUser({ todos: [todo] });
    const userWithoutPassword = aUserDto(user);
    vi.mocked(usersRepository).get.mockResolvedValueOnce(user);

    const retrievedUser = await getUser(user.id);
    expect(userWithoutPassword).toEqual(retrievedUser);
  });
});
