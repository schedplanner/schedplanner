import { db } from "@lib/database";
import { employee, group } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const group_id = form_data.get("group_id") as unknown as number;

  await db.delete(employee).where(eq(employee.groupId, group_id));

  await db.delete(group).where(eq(group.id, group_id));

  const firstGroup = (await db.select().from(group))[0];

  await db.update(group).set({ defaultGroup: true }).where(eq(group.id, firstGroup.id));

  return redirect(request.headers.get("referer") || "/");
};
