import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, client } from "@lib/database";

await migrate(db, { migrationsFolder: "./drizzle" });

await client.end();
