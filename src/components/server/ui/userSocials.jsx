"use server";

import {
  BiLogoFacebookSquare,
  BiLogoInstagramAlt,
  BiLogoLinkedinSquare,
  BiLogoTwitter,
  BiLogoYoutube,
  BiWorld,
} from "react-icons/bi";

export default async function UserSocials({ socials }) {
  return (
    <ul className="h-list">
      {socials.facebook ? (
        <li className="interactive">
          <a href={socials?.facebook}>
            <BiLogoFacebookSquare />
          </a>
        </li>
      ) : (
        ""
      )}
      {socials.instagram ? (
        <li className="interactive">
          <a href={socials?.instagram}>
            <BiLogoInstagramAlt />
          </a>
        </li>
      ) : (
        ""
      )}
      {socials.twitter ? (
        <li className="interactive">
          <a href={socials?.twitter}>
            <BiLogoTwitter />
          </a>
        </li>
      ) : (
        ""
      )}
      {socials.linkedin ? (
        <li className="interactive">
          <a href={socials?.linkedin}>
            <BiLogoLinkedinSquare />
          </a>
        </li>
      ) : (
        ""
      )}
      {socials.youtube ? (
        <li className="interactive">
          <a href={socials?.youtube}>
            <BiLogoYoutube />
          </a>
        </li>
      ) : (
        ""
      )}
      {socials.personal ? (
        <li className="interactive">
          <a href={socials?.personal}>
            <BiWorld />
          </a>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
}
