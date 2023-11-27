"use server";

import { getRecentPosts } from "@/actions/main/actions";
import { readCookie } from "@/assets/js/helpers";
import BlogPost from "@/components/server/blog/blogPost";
import { cookies } from "next/headers";

export default async function Blog() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const recentPosts = await getRecentPosts();
  return (
    <div className="content">
      <div className="full-width flex-column">
        <h3 className="title">RECENT BLOG POSTS</h3>
        <section className="flex-column main-blog posts">
          <BlogPost user={user} data={recentPosts} />
          <BlogPost user={user} data={recentPosts} />
        </section>
      </div>
    </div>
  );
}
