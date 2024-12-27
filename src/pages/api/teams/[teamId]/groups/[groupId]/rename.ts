import { db } from "@lib/database";
import { group } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const formData = await request.formData();

  await db
    .update(group)
    .set({ name: formData.get("group_name")?.toString() })
    .where(eq(group.id, Number(params.groupId)));

  return redirect(request.headers.get("referer") || "/");
};
