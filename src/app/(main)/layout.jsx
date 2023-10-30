import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";
import "../../assets/css/app.scss";

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const settings = readCookie(cookieStore, "settings");
  const theme = settings
    ? settings.theme
      ? settings.theme
      : "light"
    : "light";

  return (
    <>
      <html lang="en">
        <body data-theme={theme}>
          <div id="root">
            <div className="overlay"></div>
            <div className="main-container">{children}</div>
          </div>
        </body>
      </html>
    </>
  );
}
