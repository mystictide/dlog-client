import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";

export const metadata = {
  metadataBase: new URL("https://herrguller.cc"),
  title: {
    default: "dlog",
    template: "%s / dlog",
  },
  description:
    "Explore my portfolio showcasing a diverse range of web development projects. From responsive websites to interactive web applications.",
  keywords:
    "web development, portfolio, responsive design, web applications, coding projects, UX/UI design, front-end development, back-end development, digital experiences, creative solutions, coding, programming, personal blog, tech trends, music, films, podcasts, memes",
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
