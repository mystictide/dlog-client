"use server";

import { getPost } from "@/actions/blog/actions";
import { decodeTitle, formatDate, readCookie } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import Breadcrumb from "@/components/server/blog/breadcrumb";
import UserSocials from "@/components/server/ui/userSocials";
import { cookies } from "next/headers";

export default async function View({ params }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const decoded = decodeTitle(params?.title);
  const post = await getPost(decoded.id, decoded.title, true);

  function createMarkup(body) {
    return { __html: body };
  }

  function Body(body) {
    return (
      <div className="post-body" dangerouslySetInnerHTML={createMarkup(body)} />
    );
  }

  return (
    <div className="content">
      {post?.ID && !post?.error ? (
        <div className="full-width flex-column post-view">
          <Breadcrumb post={post} />
          <h3 className="title">{post.Title}</h3>
          <div className="author flex-row">
            <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
            <section className="flex-column">
              <h5>{post.Author}</h5>
              <h6>posted on {formatDate(post.Date)}</h6>
              {post.UpdateDate ? (
                <h6>updated on {formatDate(post.UpdateDate)}</h6>
              ) : (
                ""
              )}
            </section>
            <section className="author-socials">
              <UserSocials socials={post.AuthorSocials} />
            </section>
            <section className="author-functions">
              {user?.UID === post.UID ? (
                <div className="flex-row">
                  <a
                    href={`/blog/manage/${post.ID}`}
                    className="anchor-function"
                  >
                    Edit
                  </a>
                  <a href={"/"} className="anchor-function">
                    Hide
                  </a>
                </div>
              ) : (
                "social icons"
              )}
            </section>
          </div>
          <section className="flex-column main-blog posts">
            {Body(post.Body)}
          </section>
          <section className="flex-row author-functions"></section>
        </div>
      ) : (
        "Couldn't find a post with this title."
      )}
    </div>
  );
}
