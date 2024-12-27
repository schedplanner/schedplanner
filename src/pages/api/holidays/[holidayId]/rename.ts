import { db } from "@lib/database";
import { holiday } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const formData = await request.formData();

  await db
    .update(holiday)
    .set({ name: formData.get("holiday_name")?.toString() })
    .where(eq(holiday.id, Number(params.holidayId)));

  return redirect(request.headers.get("referer") || "/");
};
