import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { location } from "@lib/database/schema/location";

export const employee = pgTable("employee", {
  id: serial("id").primaryKey(),
  full_name: varchar("full_name", { length: 128 }).notNull().unique(),
  first_name: varchar("first_name", { length: 128 }).notNull(),
  last_name: varchar("last_name", { length: 128 }).notNull(),
  location_id: integer("location_id").references(() => location.id),
});
