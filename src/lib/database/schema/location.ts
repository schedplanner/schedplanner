import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const location = pgTable("location", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull().unique(),
  default_location: boolean("default_location").default(false).notNull(),
  street: varchar("street", { length: 128 }),
  zip_code: varchar("zip_code", { length: 128 }),
  city: varchar("city", { length: 128 }),
  country: varchar("country", { length: 128 }),
});
