import { db } from "@lib/database";
import { employee } from "@lib/database/schema/employee";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const employees = await db.select().from(employee);

  return new Response(JSON.stringify(employees), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const first_name = form_data.get("first_name") as string;
  const last_name = form_data.get("last_name") as string;
  const location_id = form_data.get("location_id") as unknown as number;

  const insert_data = {
    full_name: `${first_name} ${last_name}`,
    first_name: first_name,
    last_name: last_name,
    location_id: location_id,
  };

  await db.insert(employee).values(insert_data);

  return redirect(request.headers.get("referer"));
};
