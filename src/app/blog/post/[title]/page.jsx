"use server";

import { getPost } from "@/actions/blog/actions";
import { formatDate, readCookie } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import Breadcrumb from "@/components/server/blog/breadcrumb";
import { cookies } from "next/headers";

export default async function View({ params }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const post = await getPost(params?.id, params?.title, true);

  return (
    <div className="content">
      <div className="full-width flex-column post-view">
        <Breadcrumb post={post} />
        <h3 className="title">{post.Title}</h3>
        <div className="author flex-row">
          <ManageAvatar viewOnly={true} picture={post.AuthorImage} />
          <div className="flex-column">
            <h5>{post.Author}</h5>
            <h6>{formatDate(post.Date)}</h6>
          </div>
        </div>
        <section className="flex-column main-blog posts"></section>
      </div>
    </div>
  );
}
