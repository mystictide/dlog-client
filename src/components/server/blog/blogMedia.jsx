"use server";

import { formatDate, formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";

export default async function BlogMedia({ data }) {
  function createTitle(title) {
    let text = title.length >= 56 ? title.substring(0, 56) + "..." : title;
    return { __html: text };
  }
  function createMarkup(body) {
    return { __html: body };
  }
  function Body(body) {
    return (
      <div
        className="media-preview"
        dangerouslySetInnerHTML={createMarkup(body)}
      />
    );
  }
  function Title(title) {
    return <h3 dangerouslySetInnerHTML={createTitle(title)} />;
  }

  return (
    <>
      {data?.map((post) => (
        <a
          aria-label={post.Title}
          href={`/blog/post/${formatPrettyURL(post.Title)}-${post.ID}`}
          key={post.ID}
        >
          <div className="media-container flex-column">
            <div className="info flex-column">
              {Title(post.Title)}
              <h6>{post.Category}</h6>
            </div>
            {Body(post.Body)}
            <div className="author flex-row">
              <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
              <div className="flex-column">
                <h5>{post.Author}</h5>
                <h6>{formatDate(post.Date)}</h6>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
