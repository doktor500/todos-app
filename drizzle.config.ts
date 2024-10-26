import { defineConfig } from "drizzle-kit";

import env from "@/modules/domain/utils/env";

export default defineConfig({
  schema: "./src/datastore/schema.ts",
  out: "./src/datastore/migrations",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  verbose: false,
  strict: true,
});
