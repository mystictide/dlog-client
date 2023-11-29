"use server";

import Link from "next/link";

export default async function Breadcrumb({ post }) {
  return (
    <div className="breadcrumb full-width flex-row">
      <Link href={"/blog"}>Home</Link> {">"}
      <Link href={`/blog/c/${post.Category.toLowerCase()}`}>
        {post.Category}
      </Link>
      {">"}
      <h5>{post.Title}</h5>
    </div>
  );
}
