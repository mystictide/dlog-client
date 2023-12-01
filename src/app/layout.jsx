import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "FRKN",
    template: "%s / FRKN",
  },
  description: "Just a blog",
  keywords:
    "web development, coding, programming, personal blog, tech trends, music, films, podcasts, memes",
  author: "Furkan Güler",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const settings = readCookie(cookieStore, "settings");
  const theme = settings
    ? settings.theme
      ? settings.theme
      : "light"
    : "light";

  return (
    <html lang="en">
      <body data-theme={theme} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
