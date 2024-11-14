import { db } from "@lib/database";
import { team } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const teamId = form_data.get("team_id") as unknown as number;
  const teamName = form_data.get("team_name") as unknown as string;

  await db.update(team).set({ name: teamName }).where(eq(team.id, teamId));

  return redirect(request.headers.get("referer") || "/");
};
