"use server";

import { getPostContent } from "@/actions/blog/actions";
import { readCookie } from "@/assets/js/helpers";
import PostManager from "@/components/client/blog/postManager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Manage({ params }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const post = await getPostContent(params?.id);
  
  if (user.UID != post?.UserID) {
    redirect("/blog/");
  }

  return (
    <div className="content">
      <PostManager user={user} post={post} isMedia={post.IsMedia} />
    </div>
  );
}
