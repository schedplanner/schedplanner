import { group } from "@lib/database/schema/group";

import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const employee = pgTable("employee", {
  id: serial("id").primaryKey(),
  full_name: varchar("full_name", { length: 128 }).notNull().unique(),
  first_name: varchar("first_name", { length: 128 }).notNull(),
  last_name: varchar("last_name", { length: 128 }).notNull(),
  group_id: integer("group_id").references(() => group.id),
});
