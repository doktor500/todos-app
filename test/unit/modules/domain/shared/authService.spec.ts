import authService, { authCookie } from "@/modules/domain/shared/authService";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { decrypt, encrypt } from "@/modules/domain/utils/encryptionUtils";
import appRouter, { Route } from "@/router/appRouter";

vi.mock("@/modules/domain/shared/cookieManager");
vi.mock("@/modules/domain/utils/encryptionUtils");
vi.mock("@/router/appRouter");

const { HOME, LOGIN } = Route;

describe("auth service", () => {
  const userId = 1;

  it("can create an auth session cookie", async () => {
    const session = JSON.stringify({ userId });
    vi.mocked(encrypt).mockResolvedValueOnce(session);

    await authService.createSession(userId);

    expect(encrypt).toHaveBeenCalledWith({ userId, expires: expect.any(Date) });
    expect(cookieManager.setCookie).toHaveBeenCalledWith(
      authCookie.name,
      session,
      expect.objectContaining(authCookie.options)
    );
  });

  it("redirects to the home page when the auth session cookie is created successfully", async () => {
    const session = JSON.stringify({ userId });
    vi.mocked(encrypt).mockResolvedValueOnce(session);

    await authService.createSession(userId);

    expect(appRouter.redirectTo).toHaveBeenCalledWith(HOME);
  });

  it("returns user id when the auth session cookie is valid", async () => {
    const session = JSON.stringify({ userId });
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce(session);
    vi.mocked(decrypt).mockResolvedValueOnce(JSON.parse(session));

    await expect(authService.verifySession()).resolves.toEqual({ userId });
  });

  it("redirects to login page when the auth session cookie is invalid", async () => {
    const session = JSON.stringify({ session: "invalid" });
    vi.mocked(cookieManager.getCookie).mockResolvedValueOnce(session);
    vi.mocked(decrypt).mockResolvedValueOnce(JSON.parse(session));

    await authService.verifySession();

    expect(appRouter.redirectTo).toHaveBeenCalledWith(LOGIN);
  });
});
