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
        socials.facebook.startsWith("https") ? (
          <li className="interactive">
            <a href={socials?.facebook}>
              <BiLogoFacebookSquare />
            </a>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {socials.instagram ? (
        socials.instagram.startsWith("https") ? (
          <li className="interactive">
            <a href={socials?.instagram}>
              <BiLogoInstagramAlt />
            </a>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {socials.twitter ? (
        socials.twitter.startsWith("https") ? (
          <li className="interactive">
            <a href={socials?.twitter}>
              <BiLogoTwitter />
            </a>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {socials.linkedin ? (
        socials.linkedin.startsWith("https") ? (
          <li className="interactive">
            <a href={socials?.linkedin}>
              <BiLogoLinkedinSquare />
            </a>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {socials.youtube ? (
        socials.youtube.startsWith("https") ? (
          <li className="interactive">
            <a href={socials?.youtube}>
              <BiLogoYoutube />
            </a>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {socials.personal ? (
        socials.personal.startsWith("https") ? (
          <li className="interactive">
            <a href={socials?.personal}>
              <BiWorld />
            </a>
          </li>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </ul>
  );
}
