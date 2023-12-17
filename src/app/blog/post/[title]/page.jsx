"use server";

import { getPost } from "@/actions/blog/actions";
import { decodeTitle, formatDate, readCookie } from "@/assets/js/helpers";
import CommentManager from "@/components/client/blog/commentManager";
import PostVoting from "@/components/client/blog/postVoting";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import Breadcrumb from "@/components/server/blog/breadcrumb";
import Comments from "@/components/server/blog/comments";
import UserSocials from "@/components/server/ui/userSocials";
import { cookies } from "next/headers";
import { cache } from "react";

const cachedPost = cache(async (params) => {
  const decoded = decodeTitle(params?.title);
  return await getPost(decoded.id, decoded.title, true);
});

export async function generateMetadata({ params }) {
  const post = await cachedPost(params);
  return {
    title: post.Title ?? "404",
  };
}

export default async function View({ params, searchParams }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const post = await cachedPost(params);

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
              <h5>
                <a className="user-link" href={`/user/${post.Author}`}>
                  {post.Author}
                </a>
              </h5>
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
                ""
              )}
            </section>
          </div>
          <section className="flex-column main-blog posts">
            {Body(post.Body)}
          </section>
          <section className="flex-column post-interaction">
            <PostVoting user={user} post={post} />
            <CommentManager post={post} />
            <Comments user={user} post={post} searchParams={searchParams} />
          </section>
        </div>
      ) : (
        "Couldn't find a post with this title."
      )}
    </div>
  );
}
