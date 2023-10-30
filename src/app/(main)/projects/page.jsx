import Portfolio from "@/components/server/resume/portfolio";
import SetTheme from "@/components/server/settings/setTheme";
import Link from "next/link";
import { TbArrowBack } from "react-icons/tb";

export default function Projects() {
  return (
    <div className="content-wrapper">
      <div className="projects">
        <section className="header">
          <h1>
            <Link href="/">
              <TbArrowBack />
            </Link>{" "}
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
        <SetTheme />
      </footer>
    </div>
  );
}
