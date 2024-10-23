import { db } from "@lib/database";
import { employee } from "@lib/database/schema/employee";
import { group } from "@lib/database/schema/group";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const location_id = form_data.get("group_id") as unknown as number;

  await db.delete(employee).where(eq(employee.group_id, location_id));

  await db.delete(group).where(eq(group.id, location_id));

  const first_group = (await db.select().from(group))[0];

  await db.update(group).set({ default_group: true }).where(eq(group.id, first_group.id));

  return redirect(request.headers.get("referer") || "/");
};
