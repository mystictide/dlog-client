"use server";

import { getPost } from "@/actions/blog/actions";
import { readCookie } from "@/assets/js/helpers";
import { cookies } from "next/headers";

export default async function View({ params }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const post = await getPost(params?.id, params?.title);
  return (
    <div className="content">
      <h3>{post ? post.Title : "Couldn't find"}</h3>
    </div>
  );
}
