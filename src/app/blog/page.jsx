"use server";

import { filterPosts, getRecentPosts } from "@/actions/main/actions";
import { buildFilter } from "@/assets/js/helpers";
import AdvancedSearch from "@/components/client/ui/advSearch";
import BlogMedia from "@/components/server/blog/blogMedia";
import BlogPost from "@/components/server/blog/blogPost";
import Pager from "@/components/server/ui/pager";

export async function generateMetadata() {
  return {
    metadataBase: new URL("https://herrguller.cc/blog"),
    description:
      "Discover a limitless world of ideas on our open blog platform. Anyone can contribute and share their passions, insights, and stories on a vast array of topics – from technology and media to lifestyle and personal experiences. Immerse yourself in a community where creativity knows no bounds. Start writing or exploring today!",
    keywords:
      "web development, portfolio, responsive design, web applications, coding projects, UX/UI design, front-end development, back-end development, digital experiences, creative solutions, coding, programming, personal blog, tech trends, music, films, podcasts, memes, open blog, diverse perspectives, community writing, tech trends, personal experiences, creative pursuits, lifestyle, opinions, contributor platform, free expression",
  };
}

export default async function Blog({ searchParams }) {
  let recentPosts = null;
  let recentMedia = null;
  let searchResults = null;
  let filter = null;

  if (Object.keys(searchParams).length < 1) {
    recentPosts = await getRecentPosts(false);
    recentMedia = await getRecentPosts(true);
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
      {recentPosts?.length > 0 && recentMedia?.length > 0 ? (
        <div className="content">
          <div className="full-width flex-column">
            <h3 className="title">RECENT BLOG POSTS</h3>
            <section className="flex-column main-blog posts">
              <BlogPost data={recentPosts} mini={false}/>
            </section>
            <h3 className="title">RECENT MEDIA</h3>
            <section className="flex-row main-blog media">
              <BlogMedia data={recentMedia} />
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
      {!recentPosts?.length > 0 && !searchResults?.data?.length ? (
        <div className="content">
          <div className="full-width flex-column">
            <h3 className="title">Oops!</h3>
            {filter ? <AdvancedSearch filter={filter} /> : ""}
            <h5>Couldn't find anything.</h5>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
