"use server";

export default async function Breadcrumb({ post }) {
  return (
    <div className="breadcrumb full-width flex-row">
      <a href={"/blog"}>Home</a> {">"}
      <a href={`/blog/c/${post.Category.toLowerCase()}`}>{post.Category}</a>
      {">"}
      <h5>{post.Title}</h5>
    </div>
  );
}
