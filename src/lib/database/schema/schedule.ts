import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { employee } from "@lib/database/schema/employee";
import { shift } from "@lib/database/schema/shift";

export const schedule = pgTable("schedule", {
  id: serial("id").primaryKey(),
  employee_id: integer("employee_id")
    .references(() => employee.id)
    .notNull(),
  shift_id: integer("shift_id")
    .references(() => shift.id)
    .notNull(),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  day: integer("day").notNull(),
});
