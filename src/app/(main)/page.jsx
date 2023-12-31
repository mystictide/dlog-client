"use server";

import { readCookie } from "@/assets/js/helpers";
import SetTheme from "@/components/client/user/settings/setTheme";
import { cookies } from "next/headers";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaBlog, FaCss3Alt, FaNode, FaReact, FaSass } from "react-icons/fa";
import {
  SiDotnet,
  SiExpress,
  SiMicrosoftsqlserver,
  SiPostgresql,
  SiRedux,
  SiUbuntu,
} from "react-icons/si";
import {
  TbBrandCSharp,
  TbBrandDocker,
  TbBrandHtml5,
  TbBrandJavascript,
  TbBrandNextjs,
} from "react-icons/tb";

export async function generateMetadata() {
  return {
    title: "FRKN",
  };
}

export default async function Home() {
  const cookieStore = cookies();
  const settings = await readCookie(cookieStore, "settings");
  const theme = settings?.theme ? settings?.theme : "light";

  return (
    <div className="full-page">
      <div className="resume">
        <div className="about">
          <div className="personal">
            <h1>
              hello, I'm <span>FURKAN GÜLER</span>
            </h1>
            <h3>I got into Software Development in 2019.</h3>
            <h4>
              I have since dedicated my time into refining my expertise in
              Full-stack Web and Desktop development.
            </h4>
          </div>
          <div className="showcase">
            <h4>
              View my{" "}
              <a
                href="/FurkanGüler_CV2023_en.pdf"
                alt="resume"
                aria-label="resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </a>
            </h4>
            <h4>
              View live versions of some of my{" "}
              <a aria-label="projects" href="/projects">
                projects
              </a>
            </h4>
            <h4>
              Available at{" "}
              <a
                target="_blank"
                aria-label="furkang2k20@outlook.com"
                href="mailto:furkang2k20@outlook.com"
              >
                furkang2k20@outlook.com
              </a>
            </h4>
          </div>
        </div>
        <div className="socials">
          <a
            target="_blank"
            aria-label="GitHub"
            href="https://github.com/mystictide"
          >
            <BsGithub />
          </a>
          <a className="blog" target="_blank" aria-label="Blog" href="/blog">
            <FaBlog />
          </a>
          <a
            target="_blank"
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/furkan-glr"
          >
            <BsLinkedin />
          </a>
        </div>
        <div className="tech">
          <span>
            <SiDotnet />
          </span>
          <span>
            <TbBrandCSharp />
          </span>
          <span>
            <TbBrandJavascript />
          </span>
          <span>
            <FaNode />
          </span>
          <span>
            <SiExpress />
          </span>
          <span>
            <TbBrandNextjs />
          </span>
          <span>
            <FaReact />
          </span>
          <span>
            <SiRedux />
          </span>
          <span>
            <FaSass />
          </span>
          <span>
            <FaCss3Alt />
          </span>
          <span>
            <TbBrandHtml5 />
          </span>
          <span>
            <SiMicrosoftsqlserver />
          </span>
          <span>
            <SiPostgresql />
          </span>
          <span>
            <SiUbuntu />
          </span>
          <span>
            <TbBrandDocker />
          </span>
        </div>
      </div>
      <footer className="theme">
        <SetTheme theme={theme} />
      </footer>
    </div>
  );
}
