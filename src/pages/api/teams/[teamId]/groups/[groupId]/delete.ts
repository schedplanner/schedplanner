import { db } from "@lib/database";
import { group } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  await db.delete(group).where(and(eq(group.teamId, Number(params.teamId)), eq(group.id, Number(params.groupId))));

  return redirect(request.headers.get("referer") || "/");
};
