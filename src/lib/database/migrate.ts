import { db, client } from "@lib/database";

import { migrate } from "drizzle-orm/postgres-js/migrator";

await migrate(db, { migrationsFolder: "./drizzle" });

await client.end();
