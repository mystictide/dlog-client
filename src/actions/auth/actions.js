"use server";
import { cookies } from "next/headers";

const API_URL = "http://localhost:3737/";

export async function register(data) {
  try {
    const res = await fetch(API_URL + "auth/register", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    cookies().set("auth", res.json());
    return res.json();
  } catch (error) {
    return false;
  }
}

export async function login(data) {
  try {
    const res = await fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    cookies().set("auth", res.json());
    return res.json();
  } catch (error) {
    return false;
  }
}

export async function checkExistingUsername(data) {
  try {
    const res = await fetch(API_URL + "auth/cusername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return true;
  }
}

export async function checkExistingEmail(data) {
  try {
    const res = await fetch(API_URL + "auth/cmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return true;
  }
}
