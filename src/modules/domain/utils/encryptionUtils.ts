import { JWTPayload, jwtVerify, SignJWT } from "jose";

import env from "@/modules/domain/shared/env";
import logger from "@/modules/domain/shared/logger";
import { toSeconds } from "@/modules/domain/utils/durationUtils";

const ENCRYPTION_ALGORITHM = "HS256" as const;

const key = new TextEncoder().encode(env.AUTH_SECRET_KEY);

export const decrypt = async <T>(session: string) => {
  return jwtVerify<T>(session, key, { algorithms: [ENCRYPTION_ALGORITHM] })
    .then((result) => result.payload)
    .catch(logger.error);
};

export const encrypt = async (payload: JWTPayload, duration: { days: number }) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ENCRYPTION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(toSeconds(duration))
    .sign(key);
};
