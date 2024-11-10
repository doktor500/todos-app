import { mock } from "vitest-mock-extended";

import { authCookie } from "@/modules/domain/shared/authCookie";
import authService from "@/modules/domain/shared/authService";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { decrypt, encrypt } from "@/modules/domain/utils/encryptionUtils";
import appRouter, { Route } from "@/router/appRouter";

vi.mock("@/modules/domain/shared/cookieManager");
vi.mock("@/modules/domain/utils/encryptionUtils");
vi.mock("@/router/appRouter");

const { HOME, LOGIN } = Route;

describe("auth service", () => {
  const userId = 1;
  const session = JSON.stringify({ userId });
  const appRouterMock = mock(appRouter());
  const cookieManagerMock = { getCookie: () => Promise.resolve(session), setCookie: vi.fn(), deleteCookie: vi.fn() };

  it("can create an auth session cookie", async () => {
    const session = JSON.stringify({ userId });
    vi.mocked(encrypt).mockResolvedValueOnce(session);
    vi.mocked(cookieManager).mockImplementation(() => cookieManagerMock);
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await authService.createSession(userId);

    expect(encrypt).toHaveBeenCalledWith({ userId });
    expect(cookieManagerMock.setCookie).toHaveBeenCalledWith(
      authCookie.name,
      session,
      expect.objectContaining(authCookie.options)
    );
  });

  it("redirects to the home page when the auth session cookie is created successfully", async () => {
    const session = JSON.stringify({ userId });
    vi.mocked(encrypt).mockResolvedValueOnce(session);
    vi.mocked(cookieManager).mockImplementation(() => cookieManagerMock);
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await authService.createSession(userId);

    expect(appRouterMock.redirectTo).toHaveBeenCalledWith(HOME);
  });

  it("returns user id when the auth session cookie is valid", async () => {
    vi.mocked(cookieManager).mockImplementation(() => cookieManagerMock);
    vi.mocked(decrypt).mockResolvedValueOnce(JSON.parse(session));

    await expect(authService.verifySession()).resolves.toEqual({ userId });
  });

  it("redirects to login page when the auth session cookie is invalid", async () => {
    const session = JSON.stringify({ session: "invalid" });
    vi.mocked(cookieManager).mockImplementation(() => cookieManagerMock);
    vi.mocked(decrypt).mockResolvedValueOnce(JSON.parse(session));
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await authService.verifySession();

    expect(appRouterMock.redirectTo).toHaveBeenCalledWith(LOGIN);
  });

  it("deletes cookie when the session is verified successfully", async () => {
    const session = JSON.stringify({ userId });
    vi.mocked(encrypt).mockResolvedValueOnce(session);
    vi.mocked(cookieManager).mockImplementation(() => cookieManagerMock);
    vi.mocked(appRouter).mockImplementation(() => appRouterMock);

    await authService.deleteSession();

    expect(cookieManagerMock.deleteCookie).toHaveBeenCalledWith(authCookie.name);
  });
});
