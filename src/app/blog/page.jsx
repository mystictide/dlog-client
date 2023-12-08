"use server";

import { filterPosts, getRecentPosts } from "@/actions/main/actions";
import { buildFilter, readCookie } from "@/assets/js/helpers";
import AdvancedSearch from "@/components/client/ui/advSearch";
import BlogPost from "@/components/server/blog/blogPost";
import Pager from "@/components/server/ui/pager";
import { cookies } from "next/headers";

export default async function Blog({ searchParams }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  let recentPosts = null;
  let searchResults = null;
  let filter = null;

  if (Object.keys(searchParams).length < 1) {
    recentPosts = await getRecentPosts();
  } else {
    filter = buildFilter({
      keyword: searchParams.keyword,
      category: searchParams.category,
      author: searchParams.author,
      page: searchParams.page,
      sortby: searchParams.sortby,
      ismedia: searchParams.ismedia,
      isadvanced: searchParams.isadvanced,
    });
    searchResults = await filterPosts(filter);
  }

  return (
    <>
      {recentPosts ? (
        <div className="content">
          <div className="full-width flex-column">
            <h3 className="title">RECENT BLOG POSTS</h3>
            <section className="flex-column main-blog posts">
              <BlogPost user={user} data={recentPosts} />
            </section>
          </div>
        </div>
      ) : (
        ""
      )}
      {searchResults?.data?.length > 0 ? (
        <div className="content">
          <div className="full-width flex-column">
            <h3 className="title">Search results</h3>
            <AdvancedSearch filter={filter} />
            <Pager data={searchResults} filter={filter} />
            <section className="flex-column main-blog posts">
              <BlogPost user={null} data={searchResults.data} />
            </section>
          </div>
        </div>
      ) : (
        ""
      )}
      {!recentPosts && !searchResults?.data?.length ? (
        <div className="content">
          <div className="full-width flex-column">
            <h3 className="title">Oops!</h3>
            <AdvancedSearch filter={filter} />
            <h5>Couldn't find anything.</h5>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
