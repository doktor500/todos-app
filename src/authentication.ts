import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

import { authCookie } from "@/cookies/authCookie";
import cookieManager from "@/modules/domain/shared/cookieManager";
import env from "@/modules/domain/shared/env";
import logger from "@/modules/domain/shared/logger";
import { UserId } from "@/modules/domain/user";
import { LOGIN_ROUTE, TODOS_ROUTE } from "@/routes";

const ENCRYPTION_ALGORITHM = "HS256" as const;

const key = new TextEncoder().encode(env.AUTH_SECRET_KEY);

export const createSession = async (userId: UserId) => {
  const expires = new Date(Date.now() + authCookie.duration);
  const session = await encrypt({ userId, expires });

  await cookieManager.setCookie(authCookie.name, session, { ...authCookie.options, expires });
  redirect(TODOS_ROUTE);
};

export const verifySession = async () => {
  const cookie = await cookieManager.getCookie(authCookie.name);
  if (cookie) {
    const session = await decrypt(cookie);
    if (!session?.userId) redirect(LOGIN_ROUTE);

    return { userId: session.userId };
  }
  redirect(LOGIN_ROUTE);
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