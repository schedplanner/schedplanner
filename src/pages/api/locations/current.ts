import Cookies from "@lib/cookies";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const form_data = await request.formData();

  const chosen_location = form_data.get("chosen_location") as string;

  cookies.set(Cookies.current_location, chosen_location, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return redirect(request.headers.get("referer"));
};
