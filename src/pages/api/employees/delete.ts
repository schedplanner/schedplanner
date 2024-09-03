import type { APIRoute } from "astro";
import { db } from "@lib/database";
import { employee } from "@lib/database/schema/employee";
import { schedule } from "@lib/database/schema/schedule";

import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const employee_id = form_data.get("employee_id") as unknown as number;

  await db.delete(schedule).where(eq(schedule.employee_id, employee_id));
  await db.delete(employee).where(eq(employee.id, employee_id));

  return redirect(request.headers.get("referer") || "/");
};
