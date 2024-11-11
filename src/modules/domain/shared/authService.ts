import "server-only";

import { authCookie } from "@/modules/domain/shared/authCookie";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { UserId } from "@/modules/domain/user";
import { toMillis } from "@/modules/domain/utils/durationUtils";
import { decrypt, encrypt } from "@/modules/domain/utils/encryptionUtils";
import appRouter, { Route } from "@/router/appRouter";

const { HOME, LOGIN } = Route;

const createSession = async (userId: UserId) => {
  const expires = new Date(Date.now() + toMillis(authCookie.duration));
  const session = await encrypt({ userId });
  await cookieManager().setCookie(authCookie.name, session, { ...authCookie.options, expires });
  appRouter().redirectTo(HOME);
};

const verifySession = async () => {
  const cookie = await cookieManager().getCookie(authCookie.name);

  return cookie ? getUserId(cookie) : appRouter().redirectTo(LOGIN);
};

const deleteSession = async () => {
  await cookieManager().deleteCookie(authCookie.name);
  appRouter().redirectTo(LOGIN);
};

const getUserId = async (cookie: string) => {
  const session = await decrypt<{ userId: UserId }>(cookie);
  const userId = session?.userId;

  return userId ? { userId } : appRouter().redirectTo(LOGIN);
};

const authService = { createSession, verifySession, deleteSession };

export default authService;
