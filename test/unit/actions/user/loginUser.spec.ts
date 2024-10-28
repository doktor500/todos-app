import { loginUser } from "@/actions/user/loginUser";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");

describe("login user action", () => {
  it("returns validation errors when the data is invalid", async () => {
    const data = { email: "", password: "" };
    const errors = await loginUser(data);

    expect(usersRepository.getUserIdBy).not.toHaveBeenCalled();
    expect(errors).toEqual({
      fieldErrors: {
        email: ["Please enter a valid email address"],
        password: ["Password must be at least 8 characters long"],
      },
      formErrors: [],
    });
  });

  it("fetches user id from the users repository when the data is valid", async () => {
    const data = { email: "David@email.com", password: "password" };
    await loginUser(data);

    expect(usersRepository.getUserIdBy).toHaveBeenCalledWith({
      email: "david@email.com",
      hashedPassword: expect.any(String),
    });
    expect(usersRepository.getUserIdBy).toHaveBeenCalledOnce();
  });

  it("creates a user session when the data is valid", async () => {
    const userId = 1;
    const data = { email: "David@email.com", password: "password" };
    vi.mocked(usersRepository.getUserIdBy).mockResolvedValueOnce(userId);

    await loginUser(data);

    expect(authService.createSession).toHaveBeenCalledWith(userId);
    expect(authService.createSession).toHaveBeenCalledOnce();
  });
});
