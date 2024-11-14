import { db } from "@lib/database";
import { employee } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const employeeId = Number(params.employeeId);

  await db.delete(employee).where(eq(employee.id, employeeId));

  return redirect(request.headers.get("referer") || "/");
};
