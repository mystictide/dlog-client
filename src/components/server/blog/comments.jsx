"use server";

import { filterComments } from "@/actions/blog/actions";
import { buildFilter, formatDate } from "@/assets/js/helpers";
import CommentVoting from "@/components/client/blog/commentVoting";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import CommentsPager from "../ui/commentsPager";

export default async function Comments({ user, post, searchParams }) {
  const filter = buildFilter({
    id: post.ID,
    page: searchParams.page,
    sortby: searchParams.sortby,
  });
  const comments = await filterComments(filter);

  return (
    <div className="full-width flex-column">
      {comments.totalItems > 0 ? (
        <>
          {comments.data?.map((comment) => (
            <div className="flex-column main-blog comments" key={comment.ID}>
              <div className="comment-container flex-column">
                <div className="flex-row">
                  <div className="author full-width flex-row">
                    <ManageAvatar
                      viewOnly={true}
                      picture={comment.AuthorImage}
                    />
                    <div className="flex-column">
                      <h5>{comment.Author}</h5>
                      <h6>{formatDate(comment.Date)}</h6>
                    </div>
                    <CommentVoting user={user} comment={comment} />
                  </div>
                </div>
                <div className="comment-body">{comment.Body}</div>
              </div>
            </div>
          ))}
          <CommentsPager data={comments} post={post} />
        </>
      ) : (
        <h5>No comments yet.</h5>
      )}
    </div>
  );
}
