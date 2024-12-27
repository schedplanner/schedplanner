import { pgTable, serial, varchar, boolean, uniqueIndex, foreignKey, integer, time, pgEnum, date } from "drizzle-orm/pg-core";

export const team = pgTable("team", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  defaultTeam: boolean("default_team").default(false).notNull(),
});

export const group = pgTable(
  "group",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name").notNull(),
    teamId: integer("team_id").notNull(),
  },
  (table) => {
    return {
      groupTeamIdFkey: foreignKey({
        columns: [table.teamId],
        foreignColumns: [team.id],
        name: "group_team_id_fkey",
      }),
    };
  }
);

export const employee = pgTable(
  "employee",
  {
    id: serial("id").primaryKey().notNull(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    teamId: integer("team_id").notNull(),
    groupId: integer("group_id").notNull(),
  },
  (table) => {
    return {
      firstNameLastNameIdx: uniqueIndex("employee_first_name_last_name_idx").using(
        "btree",
        table.firstName.asc().nullsLast(),
        table.lastName.asc().nullsLast()
      ),
      employeeTeamIdFkey: foreignKey({
        columns: [table.teamId],
        foreignColumns: [team.id],
        name: "employee_team_id_fkey",
      }),
      employeeGroupIdFkey: foreignKey({
        columns: [table.groupId],
        foreignColumns: [group.id],
        name: "employee_group_id_fkey",
      }),
    };
  }
);

export const schedule = pgTable(
  "schedule",
  {
    id: serial("id").primaryKey().notNull(),
    employeeId: integer("employee_id").notNull(),
    shiftId: integer("shift_id").notNull(),
    year: integer("year").notNull(),
    month: integer("month").notNull(),
    day: integer("day").notNull(),
  },
  (table) => {
    return {
      scheduleEmployeeIdFkey: foreignKey({
        columns: [table.employeeId],
        foreignColumns: [employee.id],
        name: "schedule_employee_id_fkey",
      }),
      scheduleShiftIdFkey: foreignKey({
        columns: [table.shiftId],
        foreignColumns: [shift.id],
        name: "schedule_shift_id_fkey",
      }),
    };
  }
);

export const shiftTypesEnum = pgEnum("shift_types", [
  "NORMAL",
  "NIGHT",
  "VACATION",
  "LEAVE_ON_REQUEST",
  "TRAINING",
  "REMOTE",
  "DELEGATION",
  "OVERTIME",
]);

export const shift = pgTable("shift", {
  id: serial("id").primaryKey().notNull(),
  label: varchar("label"),
  start: time("start").notNull(),
  end: time("end").notNull(),
  color: varchar("color"),
  shiftType: shiftTypesEnum("shift_type"),
});

export const holiday = pgTable("holiday", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name"),
  date: date("date", { mode: "string" }).notNull(),
});
