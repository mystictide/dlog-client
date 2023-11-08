"use server";
import { cookies } from "next/headers";

export async function setThemeCookies(data) {
  let settings = {
    theme: data,
  };
  cookies().set("settings", JSON.stringify(settings));
}