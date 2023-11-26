"use server";

import { formatDate, formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import Link from "next/link";

export default async function BlogPost({ user, data }) {
  return (
    <>
      {data?.map((post) => (
        <Link href={`/blog/${formatPrettyURL(post.Title)}`} key={post.ID}>
          <div className="post-container flex-row">
            <div className="info flex-column">
              <h3>{post.Title}</h3>
              <h3>{post.UserID}</h3>
            </div>
            <div className="author flex-row">
              <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
              <div className="flex-column">
                <h5>{post.Author}</h5>
                <h6>{formatDate(post.Date)}</h6>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {data?.map((post) => (
        <Link href={`/blog/${formatPrettyURL(post.Title)}`} key={post.ID + 22}>
          <div className="post-container flex-row">
            <div className="info flex-column">
              <h3>{post.Title}</h3>
              <h3>{post.UserID}</h3>
            </div>
            <div className="author flex-row">
              <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
              <div className="flex-column">
                <h5>{post.Author}</h5>
                <h6>{formatDate(post.Date)}</h6>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
