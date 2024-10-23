import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const group = pgTable("group", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull().unique(),
  default_group: boolean("default_group").default(false).notNull(),
});
