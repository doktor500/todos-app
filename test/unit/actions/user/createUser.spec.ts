import { createUser } from "@/actions/user/createUser";
import { createSession } from "@/authentication";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/authentication");

describe("create user action", () => {
  it("returns validation errors when the data is invalid", async () => {
    const data = { username: "", email: "", password: "" };
    const errors = await createUser(data);

    expect(usersRepository.createUser).not.toHaveBeenCalled();
    expect(errors).toEqual({
      fieldErrors: {
        username: ["Username must be at least 3 characters long"],
        email: ["Please enter a valid email address"],
        password: ["Password must be at least 8 characters long"],
      },
      formErrors: [],
    });
  });

  it("stores the new user in the repository when the data is valid", async () => {
    const data = { username: "david", email: "David@email.com", password: "password" };
    await createUser(data);

    expect(usersRepository.createUser).toHaveBeenCalledWith("david", "david@email.com", expect.any(String));
    expect(usersRepository.createUser).toHaveBeenCalledOnce();
  });

  it("creates a user session when the data is valid", async () => {
    const userId = 1;
    const data = { username: "david", email: "David@email.com", password: "password" };
    vi.mocked(usersRepository.createUser).mockResolvedValueOnce(userId);

    await createUser(data);

    expect(createSession).toHaveBeenCalledWith(userId);
    expect(createSession).toHaveBeenCalledOnce();
  });
});
