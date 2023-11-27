"use server";

import { formatDate, formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import Link from "next/link";

export default async function BlogPost({ user, data }) {
  function createMarkup(body) {
    let text = body.substring(0, 445) + "...";
    return { __html: text };
  }
  function Body(body) {
    return (
      <div
        className="post-preview"
        dangerouslySetInnerHTML={createMarkup(body)}
      />
    );
  }

  return (
    <>
      {data?.map((post) => (
        <Link href={`/blog/post/${formatPrettyURL(post.Title)}`} key={post.ID}>
          <div className="post-container flex-column">
            <div className="flex-row">
              <div className="info flex-column">
                <h3>{post.Title}</h3>
                <h6>{post.Category}</h6>
              </div>
              <div className="author flex-row">
                <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
                <div className="flex-column">
                  <h5>{post.Author}</h5>
                  <h6>{formatDate(post.Date)}</h6>
                </div>
              </div>
            </div>
            {Body(post.Body)}
          </div>
        </Link>
      ))}
    </>
  );
}
