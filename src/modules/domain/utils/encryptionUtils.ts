import bcrypt from "bcryptjs";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

import env from "@/modules/domain/shared/env";
import logger from "@/modules/domain/shared/logger";

const ENCRYPTION_ALGORITHM = "HS256" as const;

const key = new TextEncoder().encode(env.AUTH_SECRET_KEY);

export const decrypt = async <T>(session: string) => {
  return jwtVerify<T>(session, key, { algorithms: [ENCRYPTION_ALGORITHM] })
    .then((result) => result.payload)
    .catch(logger.error);
};

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload).setProtectedHeader({ alg: ENCRYPTION_ALGORITHM }).setIssuedAt().sign(key);
};

export const hash = async (value: string, salt = env.ENCRYPTION_SALT) => {
  const hashSalt = salt?.replace(/\\/g, "") ?? 10;

  return bcrypt.hash(value, hashSalt);
};
