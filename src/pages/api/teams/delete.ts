import { db } from "@lib/database";
import { employee, team } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const teamId = form_data.get("team_id") as unknown as number;

  await db.delete(employee).where(eq(employee.teamId, teamId));

  await db.delete(team).where(eq(team.id, teamId));

  const firstTeam = (await db.select().from(team))[0];

  await db.update(team).set({ defaultTeam: true }).where(eq(team.id, firstTeam.id));

  return redirect(request.headers.get("referer") || "/");
};
