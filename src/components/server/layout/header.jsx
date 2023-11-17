import { readCookie } from "@/assets/js/helpers";
import SetTheme from "@/components/server/user/settings/setTheme";
import { cookies } from "next/headers";
import Link from "next/link";
import AuthClient from "../../client/user/accounts/authClient";

export default function Header() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");

  return (
    <div className="header">
      <div className="nav">
        {user ? "" : <AuthClient />}
        <div className="categories">
          <ul className="h-list">
            <li>
              <Link href="/blog/c/tech">Tech</Link>
            </li>
            <li>
              <Link href="/blog/c/music">Music</Link>
            </li>
            <li>
              <Link href="/blog/c/writing">Writing</Link>
            </li>
            <li>
              <Link href="/blog/c/memes">Memes</Link>
            </li>
          </ul>
        </div>
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
