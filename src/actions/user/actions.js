"use server";
import { readCookie } from "@/assets/js/helpers";
import axios from "axios";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:3737/";
const API_URL = "https://dapi.herrguller.cc/";

export async function setSettings(data) {
  const cookieStore = cookies();
  let curSettings = readCookie(cookieStore, "settings") ?? null;
  let settings = {
    theme: data?.theme ? data.theme : curSettings?.theme ?? "light",
    picture: data?.picture ? data.picture : curSettings?.picture ?? null,
    bio: data?.bio ? data.bio : curSettings?.bio ?? null,
    facebook: data?.facebook ? data.facebook : curSettings?.facebook ?? null,
    instagram: data?.instagram
      ? data.instagram
      : curSettings?.instagram ?? null,
    twitter: data?.twitter ? data.twitter : curSettings?.twitter ?? null,
    linkedin: data?.linkedin ? data.linkedin : curSettings?.linkedin ?? null,
    personal: data?.personal ? data.personal : curSettings?.personal ?? null,
  };
  cookies().set("settings", JSON.stringify(settings));
}

export async function setAuth(data) {
  const cookieStore = cookies();
  let curUser = readCookie(cookieStore, "auth") ?? null;
  let user = {
    Username: data?.Username ? data.Username : curUser?.Username ?? null,
    Email: data?.Email ? data.Email : curUser?.Email ?? null,
    Token: data?.Token ? data.Token : curUser?.Token ?? null,
  };
  cookies().set("auth", JSON.stringify(user));
}

export async function resetSettings() {
  const cookieStore = cookies();
  let curSettings = readCookie(cookieStore, "settings") ?? null;
  let settings = {
    theme: curSettings?.theme ?? "light",
    picture: null,
    bio: null,
    facebook: null,
    instagram: null,
    twitter: null,
    linkedin: null,
    personal: null,
  };
  cookies().set("settings", JSON.stringify(settings));
}

export async function manageAvatar(data) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth") ?? null;
  try {
    if (user) {
      var config = {
        method: "post",
        url: API_URL + "user/manageAvatar",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.Token,
        },
        data: data,
      };
      var data = await axios(config)
        .then(function (response) {
          let settings = {
            picture:
              "https://dapi.herrguller.cc/static/avatars/user" +
              response.data +
              "ua-small.jpg",
          };
          setSettings(settings);
          let resp = { success: true, picture: settings.picture };
          return resp;
        })
        .catch(function (error) {
          let err = { error: true, message: error?.response.data };
          return err;
        });
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}

export async function updateEmail(data) {
  try {
    var config = {
      method: "post",
      url: API_URL + "user/update/email",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      data: JSON.stringify(data.email),
    };
    var data = await axios(config)
      .then(function (response) {
        let email = { Email: JSON.stringify(response.data) };
        setAuth(email);
        return true;
      })
      .catch(function (error) {
        return error?.response.data;
      });
    return data;
  } catch (error) {
    return false;
  }
}

export async function updatePassword(data) {
  try {
    var config = {
      method: "post",
      url: API_URL + "user/update/password",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      data: data,
    };
    var data = await axios(config)
      .then(function (response) {
        return true;
      })
      .catch(function (error) {
        return false;
      });
    return data;
  } catch (error) {
    return false;
  }
}
