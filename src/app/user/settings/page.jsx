"use server";

import { readCookie } from "@/assets/js/helpers";
import Settings from "@/components/client/user/settings/settings";
import { cookies } from "next/headers";

export default async function UserSettings() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const settings = readCookie(cookieStore, "settings");
  return <Settings user={user} settings={settings} />;
}
