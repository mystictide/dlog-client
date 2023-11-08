"use client";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function SetThemeClient({ theme, handleTheme }) {
  return (
    <>
      {theme == "dark" ? (
        <span onClick={(e) => handleTheme("light")}>
          <MdLightMode />
        </span>
      ) : (
        <span onClick={(e) => handleTheme("dark")}>
          <MdDarkMode />
        </span>
      )}
    </>
  );
}

export default SetThemeClient;
