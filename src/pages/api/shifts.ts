import { db } from "@lib/database";
import { shift } from "@lib/database/schema/shift";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const shifts = await db.select().from(shift);

  return new Response(JSON.stringify(shifts), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const insert_data = {
    start: form_data.get("start") as string,
    end: form_data.get("end") as string,
  };

  await db.insert(shift).values(insert_data);

  return redirect(request.headers.get("referer") || "/");
};
