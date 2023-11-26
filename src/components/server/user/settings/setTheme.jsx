import { setSettings } from "@/actions/user/actions";
import { readCookie } from "@/assets/js/helpers";
import SetThemeClient from "@/components/client/user/settings/setTheme";
import { cookies } from "next/headers";

export default async function SetTheme() {
  const cookieStore = cookies();
  const settings = readCookie(cookieStore, "settings");
  const theme = settings
    ? settings.theme
      ? settings.theme
      : "light"
    : "light";

  const handleTheme = async (data) => {
    "use server";
    let theme = { theme: data };
    await setSettings(theme);
  };

  return <SetThemeClient theme={theme} handleTheme={handleTheme} />;
}
