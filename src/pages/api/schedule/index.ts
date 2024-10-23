import { db } from "@lib/database";
import { schedule } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async () => {
  const schedules = await db.select().from(schedule);

  return new Response(JSON.stringify(schedules), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const shiftId = form_data.get("shift_id") as unknown as number;
  const employeeId = form_data.get("employee_id") as unknown as number;
  const year = form_data.get("year") as unknown as number;
  const month = form_data.get("month") as unknown as number;
  const day = form_data.get("day") as unknown as number;

  if (isNaN(shiftId)) {
    await db
      .delete(schedule)
      .where(and(eq(schedule.employeeId, employeeId), eq(schedule.year, year), eq(schedule.month, month), eq(schedule.day, day)));
  } else {
    await db
      .delete(schedule)
      .where(and(eq(schedule.employeeId, employeeId), eq(schedule.year, year), eq(schedule.month, month), eq(schedule.day, day)));

    await db.insert(schedule).values({
      shiftId: shiftId,
      employeeId: employeeId,
      year: year,
      month: month,
      day: day,
    });
  }

  return redirect("/");
};
