import { db } from "@lib/database";
import { team } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  await db.delete(team).where(eq(team.id, Number(params.teamId)));

  const firstTeam = (await db.select({ id: team.id }).from(team))[0];
  await db.update(team).set({ defaultTeam: true }).where(eq(team.id, firstTeam.id));

  return redirect(request.headers.get("referer") || "/");
};
