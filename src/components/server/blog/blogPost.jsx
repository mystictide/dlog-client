"use server";

import { formatDate, formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";

export default async function BlogPost({ data, mini }) {
  function createTitle(title) {
    let text = title.length >= 56 ? title.substring(0, 56) + "..." : title;
    return { __html: text };
  }
  function Title(title) {
    return <h3 className="post-title" dangerouslySetInnerHTML={createTitle(title)} />;
  }
  function Body(body) {
    if (body === null || body === "") return false;
    else body = body.toString();
    let text = body.replace(/(<([^>]+)>)/gi, "");
    return text.length >= 445 ? text.substring(0, 445) + "..." : text;
  }

  return (
    <>
      {data?.map((post) => (
        <a
          className="hyper-post"
          aria-label={post.Title}
          href={`/blog/post/${formatPrettyURL(post.Title)}-${post.ID}`}
          key={post.ID}
        >
          <div className="post-container flex-column">
            <div className={mini ? "flex-column" : "flex-row"}>
              <div className="info flex-column">
                {Title(post.Title)}
                <h6>{post.Category}</h6>
              </div>
              <div className="author flex-row">
                {mini ? (
                  ""
                ) : (
                  <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
                )}
                <div className="flex-column">
                  {mini ? (
                    <h5 className="author-name">by {post.Author}</h5>
                  ) : (
                    <h5>{post.Author}</h5>
                  )}
                  {mini ? "" : <h6>{formatDate(post.Date)}</h6>}
                </div>
              </div>
            </div>
            {mini ? "" : <div className="post-preview">{Body(post.Body)}</div>}
          </div>
        </a>
      ))}
    </>
  );
}
