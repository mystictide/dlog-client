import "@/assets/css/main.scss";
import { readCookie } from "@/assets/js/helpers";
import Header from "@/components/client/layout/header";
import { cookies } from "next/headers";

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
        <body data-theme={theme} suppressHydrationWarning={true}>
          <div id="root">
            <div className="overlay"></div>
            <div className="main-container">
              <Header />
              {children}
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
