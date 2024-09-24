import { db } from "@lib/database";
import { location } from "@lib/database/schema/location";

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const locations = await db.select().from(location);

  return new Response(JSON.stringify(locations), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const first_location = (await db.select().from(location)).length === 0;

  const insert_data = {
    name: form_data.get("name") as string,
    street: form_data.get("street") as string,
    zip_code: form_data.get("zip_code") as string,
    city: form_data.get("city") as string,
    country: form_data.get("country") as string,
    default_location: first_location,
  };

  await db.insert(location).values(insert_data);

  return redirect(request.headers.get("referer") || "/");
};
