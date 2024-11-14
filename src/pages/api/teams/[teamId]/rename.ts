import { db } from "@lib/database";
import { team } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const formData = await request.formData();

  await db
    .update(team)
    .set({ name: formData.get("team_name")?.toString() })
    .where(eq(team.id, Number(params.teamId)));

  return redirect(request.headers.get("referer") || "/");
};
