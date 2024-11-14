import { db } from "@lib/database";
import { employee } from "@lib/database/schema";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const employees = await db.select().from(employee);

  return new Response(JSON.stringify(employees), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const form_data = await request.formData();

  await db.insert(employee).values({
    firstName: form_data.get("first_name")!.toString(),
    lastName: form_data.get("last_name")!.toString(),
    teamId: Number(params.teamId),
    groupId: Number(form_data.get("group_id")),
  });

  return redirect(request.headers.get("referer") || "/");
};
