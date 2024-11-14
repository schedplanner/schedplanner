import { db } from "@lib/database";
import { employee } from "@lib/database/schema";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const employees = await db.select().from(employee);

  return new Response(JSON.stringify(employees), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  await db.insert(employee).values({
    firstName: form_data.get("first_name") as unknown as string,
    lastName: form_data.get("last_name") as unknown as string,
    teamId: form_data.get("team_id") as unknown as number,
    // groupId: form_data.get("group_id") as unknown as number,
    groupId: 1,
  });

  return redirect(request.headers.get("referer") || "/");
};
