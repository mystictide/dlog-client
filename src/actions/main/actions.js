"use server";
import { readCookie } from "@/assets/js/helpers";
import axios from "axios";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:3737/";
const API_URL = "https://dapi.herrguller.cc/";

export async function getRecentPosts(isMedia) {
  try {
    var config = {
      method: "get",
      url: API_URL + `main/recent/post?isMedia=${isMedia}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    var data = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        let err = { error: true, message: error?.response.data };
        return err;
      });
    return data;
  } catch (error) {
    return true;
  }
}

export async function filterPosts(filter) {
  try {
    var config = {
      method: "post",
      url: API_URL + "main/filter/posts",
      headers: {
        "Content-Type": "application/json",
      },
      data: filter,
    };
    var data = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        let err = { error: true, message: error?.response.data };
        return err;
      });
    return data;
  } catch (error) {
    return true;
  }
}

export async function viewUser(username) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth") ?? null;
  try {
    var config = {
      method: "get",
      url: API_URL + `main/get/user?username=${username}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.Token,
      },
    };
    var data = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        let err = { error: true, message: error?.response.data };
        return err;
      });
    return data;
  } catch (error) {
    return true;
  }
}
