import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/datastore/schema.ts",
  out: "./src/datastore/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: false,
  strict: true,
});
