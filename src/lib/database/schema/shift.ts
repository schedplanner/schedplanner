import { pgTable, serial, varchar, time } from "drizzle-orm/pg-core";

export const shift = pgTable("shift", {
  id: serial("id").primaryKey(),
  comment: varchar("comment", { length: 128 }),
  start: time("start").notNull(),
  end: time("end").notNull(),
  color: varchar("color"),
});
