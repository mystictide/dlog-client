import { setThemeCookies } from "@/app/(main)/actions";
import { readCookie } from "@/assets/js/helpers";
import SetThemeClient from "@/components/client/settings/setTheme";
import { cookies } from "next/headers";

export default function SetTheme() {
  const cookieStore = cookies();
  const settings = readCookie(cookieStore, "settings");
  const theme = settings
    ? settings.theme
      ? settings.theme
      : "light"
    : "light";

  const handleTheme = async (data) => {
    "use server";
    await setThemeCookies(data);
  };

  return <SetThemeClient theme={theme} handleTheme={handleTheme} />;
}