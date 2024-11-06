import { db } from "@lib/database";
import { shift, shiftTypesEnum } from "@lib/database/schema";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const shifts = await db.select().from(shift);

  return new Response(JSON.stringify(shifts), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  await db.insert(shift).values({
    label: form_data.get("label") as string,
    start: form_data.get("start") as string,
    end: form_data.get("end") as string,
    color: form_data.get("color") as string,
    shiftType: form_data.get("shift_type") as unknown as typeof shift.$inferSelect.shiftType,
  });

  return redirect(request.headers.get("referer") || "/");
};
