import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "@lib/database";

await migrate(db, { migrationsFolder: "./drizzle" });
