"use client";

import { useEffect, useState } from "react";
import AuthClient from "../user/accounts/authClient";
import MobileUser from "../user/accounts/mobileUser";
import SetTheme from "../user/settings/setTheme";
import Categories from "./categories";

export default function HeaderClient({ user, settings }) {
  const theme = settings?.theme ? settings?.theme : "light";

  const [scrolling, setScrolling] = useState("");
  const isSticky = () => {
    const scrollTop = document.body.scrollTop;
    const stickyClass = scrollTop >= 50 ? "scrolling" : "";
    setScrolling(stickyClass);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky, true);
    return () => {
      window.removeEventListener("scroll", isSticky, true);
    };
  }, []);

  return (
    <div className={`header ${scrolling}`}>
      <div className="nav">
        {user ? <MobileUser settings={settings} /> : <AuthClient />}
        {user ? (
          <div className="flex-row manage">
            <a href="/blog/new" className="btn-post">
              NEW POST
            </a>
            <a href="/blog/new/media" className="btn-post">
              NEW MEDIA
            </a>
          </div>
        ) : (
          ""
        )}
        <div className="search">
          <input placeholder="..look up"></input>
        </div>
        <Categories />
        <div className="theme theme-nav">
          <SetTheme theme={theme} />
        </div>
      </div>
    </div>
  );
}
