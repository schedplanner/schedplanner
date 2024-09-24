import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const form_data = await request.formData();

  const [year, month] = (form_data.get("month") as string).split("-");

  const redirect_url = new URL((request.headers.get("referer") as string) || "/");
  redirect_url.searchParams.set("year", year);
  redirect_url.searchParams.set("month", month);

  return redirect(redirect_url.href);
};
