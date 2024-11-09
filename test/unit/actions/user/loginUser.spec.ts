import { loginUser } from "@/actions/user/loginUser";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import appRouter, { RedirectFn, Route } from "@/router/appRouter";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/router/appRouter");

const { HOME } = Route;

describe("login user action", () => {
  const initialState = undefined;
  const appRouterMock = { redirectTo: vi.fn() as unknown as RedirectFn };

  it("returns validation errors when the data is invalid", async () => {
    const data = { email: "invalid", password: "invalid" };
    const errors = await loginUser(initialState, formData(data));

    expect(usersRepository.getUserIdBy).not.toHaveBeenCalled();
    expect(errors).toEqual({
      errors: {
        email: ["Please enter a valid email address"],
        password: ["Password must be at least 8 characters long"],
      },
    });
  });

  it("fetches user id from the users repository when the data is valid", async () => {
    const data = { email: "David@email.com", password: "password" };
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await loginUser(initialState, formData(data));

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
    vi.mocked(authService.createSession).mockResolvedValue();
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await loginUser(initialState, formData(data));

    expect(authService.createSession).toHaveBeenCalledWith(userId);
    expect(authService.createSession).toHaveBeenCalledOnce();
  });

  it("redirects to home when the user is logged in successfully", async () => {
    const userId = 1;
    const data = { email: "David@email.com", password: "password" };
    vi.mocked(usersRepository.getUserIdBy).mockResolvedValueOnce(userId);
    vi.mocked(authService.createSession).mockResolvedValue();
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await loginUser(initialState, formData(data));

    expect(appRouterMock.redirectTo).toHaveBeenCalledWith(HOME);
  });
});
