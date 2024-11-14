import { db } from "@lib/database";
import { employee } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const form_data = await request.formData();

  await db
    .update(employee)
    .set({
      firstName: form_data.get("first_name")?.toString(),
      lastName: form_data.get("last_name")?.toString(),
    })
    .where(and(eq(employee.teamId, Number(params.teamId)), eq(employee.id, Number(params.employeeId))));

  return redirect(request.headers.get("referer") || "/");
};
