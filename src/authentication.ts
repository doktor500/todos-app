import { JWTPayload, jwtVerify, SignJWT } from "jose";

import { authCookie } from "@/cookies/authCookie";
import cookieManager from "@/modules/domain/shared/cookieManager";
import env from "@/modules/domain/shared/env";
import logger from "@/modules/domain/shared/logger";
import { UserId } from "@/modules/domain/user";
import appRouter, { Route } from "@/router/appRouter";

const { TODOS, LOGIN } = Route;
const ENCRYPTION_ALGORITHM = "HS256" as const;

const key = new TextEncoder().encode(env.AUTH_SECRET_KEY);

export const createSession = async (userId: UserId) => {
  const expires = new Date(Date.now() + authCookie.duration);
  const session = await encrypt({ userId, expires });

  await cookieManager.setCookie(authCookie.name, session, { ...authCookie.options, expires });
  appRouter.redirectTo(TODOS);
};

export const verifySession = async () => {
  const cookie = await cookieManager.getCookie(authCookie.name);

  return cookie ? getUserId(cookie) : appRouter.redirectTo(LOGIN);
};

const getUserId = async (cookie: string) => {
  const session = await decrypt(cookie);
  const userId = session?.userId;

  return userId ? { userId } : appRouter.redirectTo(LOGIN);
};

export const decrypt = async (session: string) => {
  try {
    const algorithms = [ENCRYPTION_ALGORITHM];
    const { payload } = await jwtVerify<JWTPayload & { userId: UserId }>(session, key, { algorithms });

    return payload;
  } catch (error) {
    logger.error(error);
  }
};

const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ENCRYPTION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};
