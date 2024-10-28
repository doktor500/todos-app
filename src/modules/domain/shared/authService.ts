import cookieManager from "@/modules/domain/shared/cookieManager";
import { UserId } from "@/modules/domain/user";
import { decrypt, encrypt } from "@/modules/domain/utils/encryptionUtils";
import appRouter, { Route } from "@/router/appRouter";

const { TODOS, LOGIN } = Route;

export const authCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, samesite: "strict", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

const createSession = async (userId: UserId) => {
  const expires = new Date(Date.now() + authCookie.duration);
  const session = await encrypt({ userId, expires });

  await cookieManager.setCookie(authCookie.name, session, { ...authCookie.options, expires });
  appRouter.redirectTo(TODOS);
};

const verifySession = async () => {
  const cookie = await cookieManager.getCookie(authCookie.name);

  return cookie ? getUserId(cookie) : appRouter.redirectTo(LOGIN);
};

const getUserId = async (cookie: string) => {
  const session = await decrypt<{ userId: UserId }>(cookie);
  const userId = session?.userId;

  return userId ? { userId } : appRouter.redirectTo(LOGIN);
};

const authService = { createSession, verifySession };

export default authService;
