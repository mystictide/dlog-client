"use server";
import { readCookie, setExpirationDate } from "@/assets/js/helpers";
import axios from "axios";
import { cookies } from "next/headers";
import { resetSettings, setSettings } from "../user/actions";

// const API_URL = "http://localhost:3737/";
const API_URL = "https://dapi.herrguller.cc/";

export async function register(data) {
  const cookieStore = cookies();
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    var data = await axios(config)
      .then(function (response) {
        let user = JSON.stringify(response.data);
        delete user.settings;
        cookies().set("auth", user, {
          expires: setExpirationDate(88),
        });
      })
      .catch(function (error) {
        return error;
      });
    return readCookie(cookieStore, "auth") ?? false;
  } catch (error) {
    return true;
  }
}

export async function login(data) {
  const cookieStore = cookies();
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    var data = await axios(config)
      .then(function (response) {
        response.data.Settings.picture =
          "https://dapi.herrguller.cc/static/avatars/user" +
          response.data.Settings?.picture +
          "ua-small.jpg";
        setSettings(response.data.Settings);
        delete response.data.Settings;
        cookies().set("auth", JSON.stringify(response.data), {
          expires: setExpirationDate(88),
        });
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
    return readCookie(cookieStore, "auth") ?? data;
  } catch (error) {
    return true;
  }
}

export async function logout() {
  resetSettings();
  cookies().delete("auth");
  return true;
}

export async function checkExistingUsername(data) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/cusername",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    let resp;
    var data = await axios(config)
      .then(function (response) {
        resp = JSON.stringify(response.data);
      })
      .catch(function (error) {
        return true;
      });
    return resp;
  } catch (error) {
    return true;
  }
}

export async function checkExistingEmail(data) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/cmail",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    let resp;
    var data = await axios(config)
      .then(function (response) {
        resp = JSON.stringify(response.data);
      })
      .catch(function (error) {
        return true;
      });
    return resp;
  } catch (error) {
    return true;
  }
}
