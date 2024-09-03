import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  cookies.set("cookies_accepted", "true", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return redirect(request.headers.get("referer") || "/");
};
