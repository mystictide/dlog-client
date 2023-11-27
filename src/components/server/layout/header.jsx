"use server";

import { readCookie } from "@/assets/js/helpers";
import HeaderClient from "@/components/client/layout/header";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = cookies();
  const user = await readCookie(cookieStore, "auth");
  const settings = await readCookie(cookieStore, "settings");

  return <HeaderClient user={user} settings={settings} />;
}
