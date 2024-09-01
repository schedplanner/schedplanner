import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";

config({ path: ".env" });

const client = postgres(process.env.PSQL_CONN);
export const db = drizzle(client);
