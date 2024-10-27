import Cookies from "@lib/cookies";
import { db } from "@lib/database";
import { group } from "@lib/database/schema";

import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  if (cookies.has("current_group_name") && cookies.has("current_group_id")) {
    let currentGroupId = cookies.get("current_group_id")!.value as unknown as number;
    let currentGroupName = cookies.get("current_group_name")!.value;

    const currentGroupExists =
      (
        await db
          .select()
          .from(group)
          .where(and(eq(group.id, currentGroupId), eq(group.name, currentGroupName)))
      ).length !== 0;

    if (currentGroupExists) {
      return new Response(JSON.stringify({ currentGroupId: currentGroupId, currentGroupName: currentGroupName }));
    } else {
      console.warn(`Location '${currentGroupName}' (ID $${currentGroupId}) not found in the database! Clearing the cookie.`);
      cookies.delete("current_group_id");
      cookies.delete("current_group_name");
    }
  }

  const defaultGroupList = await db.select({ id: group.id, name: group.name }).from(group).where(eq(group.defaultGroup, true));

  if (defaultGroupList.length === 0) {
    console.error("No default group found in the database! Redirecting to /groups");
    return redirect("/groups");
  }

  const defaultGroup = defaultGroupList[0];

  const currentGroupId = defaultGroup.id;
  const currentGroupName = defaultGroup.name;

  cookies.set("current_group_id", currentGroupId as unknown as string);
  cookies.set("current_group_name", currentGroupName);

  return new Response(JSON.stringify({ currentGroupId: currentGroupId, currentGroupName: currentGroupName }));
};

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const form_data = await request.formData();

  const chosenGroupId = form_data.get("chosen_group_id");
  const chosenGroupName = (
    await db
      .select({ name: group.name })
      .from(group)
      .where(eq(group.id, chosenGroupId as unknown as number))
  )[0].name;

  cookies.set("current_group_id", chosenGroupId as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  cookies.set("current_group_name", chosenGroupName, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return redirect(request.headers.get("referer") || "/");
};
