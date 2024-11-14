import { db } from "@lib/database";
import { group } from "@lib/database/schema";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const formData = await request.formData();

  await db.insert(group).values({
    name: formData.get("name")!.toString(),
    teamId: Number(params.teamId),
  });

  return redirect(request.headers.get("referer") || "/");
};
