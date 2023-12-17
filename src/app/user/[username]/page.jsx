"use server";

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
  // const post = await getPost(decoded.id, decoded.title, true);

  return (
    <div className="content">
      <div className="full-width flex-column post-view">
        <h3 className="title">{decodedUsername}</h3>
        <h3 className="title">{params?.username}</h3>
      </div>
    </div>
  );
}
