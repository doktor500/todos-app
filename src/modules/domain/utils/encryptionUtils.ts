import { JWTPayload, jwtVerify, SignJWT } from "jose";

import env from "@/modules/domain/shared/env";
import logger from "@/modules/domain/shared/logger";

const ENCRYPTION_ALGORITHM = "HS256" as const;

const key = new TextEncoder().encode(env.AUTH_SECRET_KEY);

export const decrypt = async <T>(session: string) => {
  try {
    const algorithms = [ENCRYPTION_ALGORITHM];
    const { payload } = await jwtVerify<T>(session, key, { algorithms });

    return payload;
  } catch (error) {
    logger.error(error);
  }
};

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ENCRYPTION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};
