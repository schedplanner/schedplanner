import { db } from "@lib/database";
import { employee, group } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const group_id = form_data.get("group_id") as unknown as number;
  const group_name = form_data.get("group_name") as unknown as string;

  await db.update(group).set({ name: group_name }).where(eq(group.id, group_id));

  return redirect(request.headers.get("referer") || "/");
};
