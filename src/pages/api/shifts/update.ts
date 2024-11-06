import { db } from "@lib/database";
import { shift } from "@lib/database/schema";

import { eq } from "drizzle-orm";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  await db
    .update(shift)
    .set({
      label: form_data.get("label") as string,
      shiftType: form_data.get("shift_type") as unknown as typeof shift.$inferSelect.shiftType,
    })
    .where(eq(shift.id, form_data.get("shift_id") as unknown as number));

  return redirect(request.headers.get("referer") || "/");
};
