import { mock } from "vitest-mock-extended";

import { createUser } from "@/actions/user/createUser";
import authService from "@/modules/domain/shared/authService";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import appRouter, { Route } from "@/router/appRouter";
import { formData } from "@/test/unit/utils/formDataUtils";

vi.mock("@/modules/domain/shared/authService");
vi.mock("@/modules/infrastructure/repositories/usersRepository");
vi.mock("@/router/appRouter");

const { HOME } = Route;

describe("create user action", () => {
  const initialState = undefined;
  const appRouterMock = mock(appRouter());

  it("returns validation errors when the data is invalid", async () => {
    const data = { username: "-", email: "invalid", password: "invalid" };
    const errors = await createUser(initialState, formData(data));

    expect(usersRepository.createUser).not.toHaveBeenCalled();
    expect(errors).toEqual({
      data,
      errors: {
        username: ["Username must be at least 3 characters long"],
        email: ["Please enter a valid email address"],
        password: ["Password must be at least 8 characters long"],
      },
    });
  });

  it("stores the new user in the repository when the data is valid", async () => {
    const data = { username: "david", email: "David@email.com", password: "password" };
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await createUser(initialState, formData(data));

    expect(usersRepository.createUser).toHaveBeenCalledWith({
      username: "david",
      email: "david@email.com",
      hashedPassword: expect.any(String),
    });
    expect(usersRepository.createUser).toHaveBeenCalledOnce();
  });

  it("creates a user session when the data is valid", async () => {
    const userId = 1;
    const data = { username: "david", email: "David@email.com", password: "password" };
    vi.mocked(usersRepository.createUser).mockResolvedValueOnce(userId);
    vi.mocked(authService.createSession).mockResolvedValue();
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await createUser(initialState, formData(data));

    expect(authService.createSession).toHaveBeenCalledWith(userId);
    expect(authService.createSession).toHaveBeenCalledOnce();
  });

  it("redirects to home when the user is created successfully", async () => {
    const userId = 1;
    const data = { username: "david", email: "David@email.com", password: "password" };
    vi.mocked(usersRepository.createUser).mockResolvedValueOnce(userId);
    vi.mocked(authService.createSession).mockResolvedValue();
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await createUser(initialState, formData(data));

    expect(appRouterMock.redirectTo).toHaveBeenCalledWith(HOME);
  });
});
