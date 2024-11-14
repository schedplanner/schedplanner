import { db } from "@lib/database";
import { employee } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const formData = await request.formData();

  await db
    .update(employee)
    .set({
      groupId: Number(formData.get("group_id")),
    })
    .where(and(eq(employee.teamId, Number(params.teamId)), eq(employee.id, Number(params.employeeId))));

  return redirect(request.headers.get("referer") || "/");
};
