import { readCookie } from "@/assets/js/helpers";
import Settings from "@/components/client/user/settings/settings";
import { cookies } from "next/headers";

export default function UserSettings() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  return <Settings user={user} />;
}
