import { db } from "@lib/database";
import { team } from "@lib/database/schema";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const teams = await db.select().from(team);

  return new Response(JSON.stringify(teams), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const isFirstTeam = (await db.select().from(team)).length === 0;

  await db.insert(team).values({
    name: form_data.get("name") as string,
    defaultTeam: isFirstTeam,
  });

  return redirect(request.headers.get("referer") || "/");
};
