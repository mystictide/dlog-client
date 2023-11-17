import { readCookie } from "@/assets/js/helpers";
import User from "@/components/client/sidebar/user";
import { cookies } from "next/headers";

export default function Sidebar() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const settings = readCookie(cookieStore, "settings");

  return (
    <div className="sidebar">
      {user ? <User user={user} settings={settings} /> : ""}
    </div>
  );
}
