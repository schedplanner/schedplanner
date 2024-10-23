import Cookies from "@lib/cookies";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const form_data = await request.formData();

  const chosen_group = form_data.get("chosen_group") as string;

  cookies.set(Cookies.current_group, chosen_group, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return redirect(request.headers.get("referer") || "/");
};
