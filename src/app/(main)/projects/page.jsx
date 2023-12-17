"use server";

import { readCookie } from "@/assets/js/helpers";
import SetTheme from "@/components/client/user/settings/setTheme";
import Portfolio from "@/components/server/resume/portfolio";
import { cookies } from "next/headers";
import { IoReturnDownBackSharp } from "react-icons/io5";

export async function generateMetadata() {
  return {
    title: "portfolio",
  };
}

export default async function Projects() {
  const cookieStore = cookies();
  const settings = await readCookie(cookieStore, "settings");
  const theme = settings?.theme ? settings?.theme : "light";

  return (
    <div className="content-wrapper">
      <div className="projects">
        <section className="header">
          <h1>
            <a href="/">
              <IoReturnDownBackSharp />
            </a>{" "}
            projects portfolio
          </h1>
          <h4>
            All projects built using a combination of .NET (& Core),
            Node/ExpressJS, SQL Server, PostgreSQL, React (Redux) and SASS/CSS
            and HTML. Dockerized and served on an Ubuntu Server.
          </h4>
        </section>
        <section className="projects-container">
          <Portfolio />
        </section>
      </div>
      <footer className="theme">
        <SetTheme theme={theme} />
      </footer>
    </div>
  );
}
