import { createEnv } from "@t3-oss/env-nextjs";
import * as process from "process";
import { z } from "zod";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ENVIRONMENT: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

export default env;
