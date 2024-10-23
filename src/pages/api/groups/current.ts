import Cookies from "@lib/cookies";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const form_data = await request.formData();

  cookies.set(Cookies.currentGroup, form_data.get("chosen_group") as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return redirect(request.headers.get("referer") || "/");
};
