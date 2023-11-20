import { readCookie } from "@/assets/js/helpers";
import Categories from "@/components/client/layout/categories";
import MobileUser from "@/components/client/user/accounts/mobileUser";
import SetTheme from "@/components/server/user/settings/setTheme";
import { cookies } from "next/headers";
import AuthClient from "../../client/user/accounts/authClient";

export default function Header() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const settings = readCookie(cookieStore, "settings");

  return (
    <div className="header">
      <div className="nav">
        {user ? <MobileUser settings={settings} /> : <AuthClient />}
        <Categories />
        <div className="search">
          <input placeholder="..look up"></input>
        </div>
        <div className="theme theme-nav">
          <SetTheme />
        </div>
      </div>
    </div>
  );
}
