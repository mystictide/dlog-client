"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgAddR, CgSearchLoading } from "react-icons/cg";
import AuthClient from "../user/accounts/authClient";
import MobileUser from "../user/accounts/mobileUser";
import SetTheme from "../user/settings/setTheme";
import Categories from "./categories";

export default function HeaderClient({ user, settings }) {
  const router = useRouter();
  const theme = settings?.theme ? settings?.theme : "light";

  const [scrolling, setScrolling] = useState("");
  const [postState, setPostState] = useState(false);
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

  function handleSearch(e) {
    e.preventDefault();
    let text = e.target.keyword.value;
    if (text.startsWith("@")) {
      router.push(`/blog/?author=${text.substring(1)}&isadvanced=true`);
    } else {
      router.push(`/blog/?keyword=${text}&isadvanced=true`);
    }
  }

  return (
    <div className={`header ${scrolling}`}>
      <div className="nav">
        <h6>
          <a aria-label="homepage" href="/blog">
            Work in progress
          </a>
        </h6>
        {user ? <MobileUser settings={settings} /> : <AuthClient />}
        {user ? (
          <div className="flex-row manage">
            <button
              className="btn-function"
              onClick={() => setPostState((prevState) => !prevState)}
            >
              <CgAddR />
            </button>
            {postState ? (
              <div className="manage-functions">
                <a
                  aria-label="create new post"
                  href="/blog/new"
                  className="btn-post"
                >
                  NEW POST
                </a>
                <a
                  aria-label="create new media"
                  href="/blog/new/media"
                  className="btn-post"
                >
                  NEW MEDIA
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="keyword"
              name="keyword"
              placeholder="..look up"
            />
            <button type="submit" className="btn-function">
              <CgSearchLoading />
            </button>
          </form>
        </div>
        <Categories />
        <div className="theme theme-nav">
          <SetTheme theme={theme} />
        </div>
      </div>
    </div>
  );
}
