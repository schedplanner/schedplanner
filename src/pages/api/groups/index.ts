import { db } from "@lib/database";
import { group } from "@lib/database/schema";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const groups = await db.select().from(group);

  return new Response(JSON.stringify(groups), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const isFirstGroup = (await db.select().from(group)).length === 0;

  await db.insert(group).values({
    name: form_data.get("name") as string,
    defaultGroup: isFirstGroup,
  });

  return redirect(request.headers.get("referer") || "/");
};
