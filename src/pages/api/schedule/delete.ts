import { db } from "@lib/database";
import { schedule } from "@lib/database/schema/schedule";

import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const shift_id = form_data.get("shift_id") as unknown as number;
  const employee_id = form_data.get("employee_id") as unknown as number;
  const year = form_data.get("year") as unknown as number;
  const month = form_data.get("month") as unknown as number;
  const day = form_data.get("day") as unknown as number;

  console.log(form_data);

  await db
    .delete(schedule)
    .where(
      and(
        eq(schedule.shift_id, shift_id),
        eq(schedule.employee_id, employee_id),
        eq(schedule.year, year),
        eq(schedule.month, month),
        eq(schedule.day, day)
      )
    );

  return redirect("/");
};
