import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/database/schema/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.PSQL_CONN,
  },
});
