"use server";

import { viewUser } from "@/actions/main/actions";
import { decodeURL, readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const decodedUsername = decodeURL(params?.username);
  return {
    title: decodedUsername,
  };
}

export default async function UserProfile({ params }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const decodedUsername = decodeURL(params?.username);
  const profile = await viewUser(decodedUsername);

  return (
    <div className="content">
      <div className="full-width flex-column post-view">
        <h3 className="title">{decodedUsername}</h3>
        <h3 className="title">{params?.username}</h3>
      </div>
    </div>
  );
}
