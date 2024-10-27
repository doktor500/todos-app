import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import env from "@/modules/domain/shared/env";

const client = postgres(env.DATABASE_URL, { max: 1 });

const main = async () => {
  await migrate(drizzle(client), { migrationsFolder: "./src/datastore/migrations" });
  await client.end();
};

main().catch(console.error);
