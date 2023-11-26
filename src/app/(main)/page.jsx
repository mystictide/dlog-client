"use server";

import SetTheme from "@/components/server/user/settings/setTheme";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaCss3Alt, FaNode, FaReact, FaSass } from "react-icons/fa";
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

export default async function Home() {
  return (
    <div className="full-page">
      <div className="resume">
        <div className="about">
          <div className="personal">
            <h1>
              hello, I'm <span>FURKAN GÜLER</span>
            </h1>
            <h3>I started Software Development training in 2019.</h3>
            <h3>
              I have been improving myself in the fields of Full-stack Web and
              Desktop for the last 3 years.
            </h3>
          </div>
          <div className="showcase">
            <h4>
              View my{" "}
              <a
                href="/FurkanGüler_CV2023_en.pdf"
                alt="resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </a>
            </h4>
            <h4>
              View live versions of some of my{" "}
              <Link href="/projects">projects</Link>
            </h4>
            <h4>
              Available at{" "}
              <a target="_blank" href="mailto:furkang2k20@outlook.com">
                furkang2k20@outlook.com
              </a>
            </h4>
          </div>
        </div>
        <div className="socials">
          <a target="_blank" href="https://github.com/mystictide">
            <BsGithub />
          </a>
          <a target="_blank" href="/blog">
            blog
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/furkan-glr">
            <BsLinkedin />
          </a>
        </div>
        <div className="tech">
          <span>
            <SiDotnet />
          </span>{" "}
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
        <SetTheme />
      </footer>
    </div>
  );
}
