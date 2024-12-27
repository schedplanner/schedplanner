import { db } from "@lib/database";
import { holiday } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  await db.delete(holiday).where(eq(holiday.id, Number(params.holidayId)));

  return redirect(request.headers.get("referer") || "/");
};
