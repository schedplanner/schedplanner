import { db } from "@lib/database";
import { employee, schedule } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const employeeId = form_data.get("employee_id") as unknown as number;

  await db.delete(schedule).where(eq(schedule.employeeId, employeeId));
  await db.delete(employee).where(eq(employee.id, employeeId));

  return redirect(request.headers.get("referer") || "/");
};
