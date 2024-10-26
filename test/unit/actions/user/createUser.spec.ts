import { createUser } from "@/actions/user/createUser";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

vi.mock("@/modules/infrastructure/repositories/usersRepository");

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

  it("calls user repository to create a user when the data is valid", async () => {
    const data = { username: "David", email: "David@email.com", password: "password" };
    await createUser(data);

    expect(usersRepository.createUser).toHaveBeenCalledWith("david", "david@email.com", expect.any(String));
  });
});
