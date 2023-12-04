"use server";
import axios from "axios";

// const API_URL = "http://localhost:3737/";
const API_URL = "https://dapi.herrguller.cc/";

export async function getRecentPosts() {
  try {
    var config = {
      method: "get",
      url: API_URL + "main/recent/post",
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
