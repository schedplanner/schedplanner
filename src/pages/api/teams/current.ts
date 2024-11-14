import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const form_data = await request.formData();

  cookies.set("current_team", form_data.get("chosen_team") as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return redirect(request.headers.get("referer") || "/");
};
