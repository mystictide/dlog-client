"use server";

import { formatPrettyURL } from "@/assets/js/helpers";

export default async function CommentsPager({ data, post }) {
  return (
    <>
      {data.filter.pager.TotalPages > 1 ? (
        <div className="pager full-width">
          <h5 className="pager-info">
            found {data.totalItems} comments, currently on page{" "}
            {data.filter.pager.CurrentPage}
          </h5>
          <ul className="flex-row h-list">
            {data.filter.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <a
                  className="pager-button"
                  aria-label={post.Title}
                  href={`/blog/post/${formatPrettyURL(post.Title)}-${
                    post.ID
                  }/?page=1`}
                >
                  {"<<"}
                </a>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <a
                  className="pager-button"
                  aria-label={post.Title}
                  href={`/blog/post/${formatPrettyURL(post.Title)}-${
                    post.ID
                  }/?page=${data.filter.pager.CurrentPage - 1}`}
                >
                  Previous Page
                </a>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li className="pager-item">
                <a
                  className="pager-button"
                  aria-label={post.Title}
                  href={`/blog/post/${formatPrettyURL(post.Title)}-${
                    post.ID
                  }/?page=${data.filter.pager.CurrentPage + 1}`}
                >
                  Next Page
                </a>
              </li>
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li className="pager-item">
                <a
                  className="pager-button"
                  aria-label={post.Title}
                  href={`/blog/post/${formatPrettyURL(post.Title)}-${
                    post.ID
                  }/?page=${data.filter.pager.TotalPages}`}
                >
                  {">>"}
                </a>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
