import { db } from "@lib/database";
import { schedule, shift } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { and, eq, inArray } from "drizzle-orm";

export const GET: APIRoute = async (request) => {
  const schedules = await db.select().from(schedule);

  return new Response(JSON.stringify(schedules), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const shiftId = form_data.get("shift_id")!.toString().split(",").map(Number);
  const employeeId = form_data.get("employee_id")!.toString().split(",").map(Number);
  const year = Number(form_data.get("year"));
  const month = Number(form_data.get("month"));
  const day = form_data.get("day")!.toString().split(",").map(Number);

  if (shiftId.length === 1 && shiftId[0] === -1) {
    await db
      .delete(schedule)
      .where(and(inArray(schedule.employeeId, employeeId), eq(schedule.year, year), eq(schedule.month, month), inArray(schedule.day, day)));
  } else {
    await db
      .delete(schedule)
      .where(and(inArray(schedule.employeeId, employeeId), eq(schedule.year, year), eq(schedule.month, month), inArray(schedule.day, day)));

    const insertData: (typeof schedule.$inferInsert)[] = [];

    for (const shift of shiftId) {
      for (const employee of employeeId) {
        for (const d of day) {
          insertData.push({
            shiftId: shift,
            employeeId: employee,
            year: year,
            month: month,
            day: d,
          });
        }
      }
    }

    await db.insert(schedule).values(insertData);
  }

  return redirect("/");
};
