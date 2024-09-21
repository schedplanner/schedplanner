import type { APIRoute } from "astro";
import { db } from "@lib/database";
import { schedule } from "@lib/database/schema/schedule";
import { shift } from "@lib/database/schema/shift";

import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const shift_id = form_data.get("shift_id") as unknown as number;

  await db.delete(schedule).where(eq(schedule.shift_id, shift_id));
  await db.delete(shift).where(eq(shift.id, shift_id));

  return redirect(request.headers.get("referer") || "/");
};
