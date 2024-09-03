import type { APIRoute } from "astro";
import { db } from "@lib/database";
import { location } from "@lib/database/schema/location";

import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const location_id = form_data.get("location_id") as unknown as number;

  await db.delete(location).where(eq(location.id, location_id));

  const first_location = (await db.select().from(location))[0];

  await db.update(location).set({ default_location: true }).where(eq(location.id, first_location.id));

  return redirect(request.headers.get("referer") || "/");
};
