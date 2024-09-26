import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });

const main = async () => {
  await migrate(drizzle(client), {
    migrationsFolder: "./src/drizzle/migrations",
  });
  await client.end();
};

main().catch(console.error);
