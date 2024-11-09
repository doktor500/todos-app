import cookieManager from "@/modules/domain/shared/cookieManager";
import { UserId } from "@/modules/domain/user";
import { toMillis } from "@/modules/domain/utils/durationUtils";
import { decrypt, encrypt } from "@/modules/domain/utils/encryptionUtils";
import appRouter, { Route } from "@/router/appRouter";

export const authCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, samesite: "strict", path: "/" },
  duration: { days: 1 },
};

const { HOME, LOGIN } = Route;

const createSession = async (userId: UserId) => {
  const expires = new Date(Date.now() + toMillis(authCookie.duration));
  const session = await encrypt({ userId, expires });
  await cookieManager().setCookie(authCookie.name, session, { ...authCookie.options, expires });
  appRouter().redirectTo(HOME);
};

const verifySession = async () => {
  const cookie = await cookieManager().getCookie(authCookie.name);

  return cookie ? getUserId(cookie) : appRouter().redirectTo(LOGIN);
};

const getUserId = async (cookie: string) => {
  const session = await decrypt<{ userId: UserId }>(cookie);
  const userId = session?.userId;

  return userId ? { userId } : appRouter().redirectTo(LOGIN);
};

const authService = { createSession, verifySession };

export default authService;
