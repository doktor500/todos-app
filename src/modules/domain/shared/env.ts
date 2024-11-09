import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET_KEY: z.string().min(1),
    ENCRYPTION_SALT: z.string().min(1),
    ENVIRONMENT: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY,
    ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

export default env;
