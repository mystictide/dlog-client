"use server";

import { readCookie } from "@/assets/js/helpers";
import PostManager from "@/components/client/blog/postManager";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return {
    title: "new post",
  };
}

export default async function New() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");

  return (
    <div className="content">
      <PostManager user={user} post={undefined} isMedia={false}/>
    </div>
  );
}
