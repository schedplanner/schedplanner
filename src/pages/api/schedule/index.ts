import { db } from "@lib/database";
import { schedule } from "@lib/database/schema/schedule";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const schedules = await db.select().from(schedule);

  return new Response(JSON.stringify(schedules), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const shift_id = form_data.get("shift_id") as unknown as number;
  const employee_id = form_data.get("employee_id") as unknown as number;
  const year = form_data.get("year") as unknown as number;
  const month = form_data.get("month") as unknown as number;
  const day = form_data.get("day") as unknown as number;

  const insert_data = {
    shift_id: shift_id,
    employee_id: employee_id,
    year: year,
    month: month,
    day: day,
  };

  await db.insert(schedule).values(insert_data);

  return redirect("/");
};
