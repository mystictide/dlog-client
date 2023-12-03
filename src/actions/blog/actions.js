"use server";
import { decodeURL, readCookie } from "@/assets/js/helpers";
import axios from "axios";
import { cookies } from "next/headers";

// const API_URL = "http://localhost:3737/";
const API_URL = "https://dapi.herrguller.cc/";

export async function getPost(id, title, view) {
  const query = `?id=${id ?? ""}&title=${decodeURL(title) ?? ""}&view=${view}`;
  try {
    var config = {
      method: "get",
      url: API_URL + "blog/get/post" + query,
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

export async function getPostContent(id) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth") ?? null;
  const query = `?id=${id ?? ""}`;
  try {
    if (user) {
      var config = {
        method: "get",
        url: API_URL + "blog/manage/post" + query,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.Token,
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
    }
  } catch (error) {
    return true;
  }
}

export async function managePost(data) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth") ?? null;
  try {
    if (user) {
      var config = {
        method: "post",
        url: API_URL + "blog/manage/post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.Token,
        },
        data: data,
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
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}
