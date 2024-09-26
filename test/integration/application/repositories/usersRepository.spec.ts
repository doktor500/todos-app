import { aTodo } from "@/test/fixtures/todo.fixture";
import { aUser } from "@/test/fixtures/user.fixture";
import { usersTestRepository } from "@/test/repositories/usersTestRepository";

describe("Users repository", () => {
  beforeEach(() => usersTestRepository.deleteAll());
  afterAll(() => usersTestRepository.end());

  it("can find a user by id", async () => {
    const todo1 = aTodo({ id: 1, content: "Buy milk" });
    const todo2 = aTodo({ id: 2, content: "Buy bread" });
    const user = aUser({ id: 1, name: "David", todos: [todo1, todo2] });

    await usersTestRepository.save(user);
    const fetchedUser = await usersTestRepository.findById(user.id);

    expect(fetchedUser).toEqual(user);
  });
});
