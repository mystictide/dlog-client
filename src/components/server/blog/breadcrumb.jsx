"use server";

export default async function Breadcrumb({ post }) {
  return (
    <div className="breadcrumb full-width flex-row">
      <a aria-label="home" href={"/blog"}>
        Home
      </a>{" "}
      {">"}
      <a
        aria-label={post.Category}
        href={`/blog/c/${post.Category.toLowerCase()}`}
      >
        {post.Category}
      </a>
      {">"}
      <h5>{post.Title}</h5>
    </div>
  );
}
