import { db } from "@lib/database";
import { group } from "@lib/database/schema/group";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const groups = await db.select().from(group);

  return new Response(JSON.stringify(groups), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const first_group = (await db.select().from(group)).length === 0;

  const insert_data = {
    name: form_data.get("name") as string,
    default_location: first_group,
  };

  await db.insert(group).values(insert_data);

  return redirect(request.headers.get("referer") || "/");
};
