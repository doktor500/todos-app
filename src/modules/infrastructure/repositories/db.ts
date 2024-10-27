import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/datastore/schema";
import env from "@/modules/domain/shared/env";

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema, logger: false });
