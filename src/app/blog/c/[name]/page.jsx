"use server";

import { filterPosts } from "@/actions/main/actions";
import { buildFilter, categoryByName } from "@/assets/js/helpers";
import BlogPost from "@/components/server/blog/blogPost";
import Pager from "@/components/server/ui/pager";

export async function generateMetadata({ params }) {
  return {
    title: params?.name,
  };
}

export default async function Category({ params, searchParams }) {
  const categoryID = categoryByName(params?.name);
  const filter = buildFilter({
    keyword: searchParams.keyword,
    category: categoryID,
    author: searchParams.author,
    page: searchParams.page,
    sortby: searchParams.sortby,
    ismedia: searchParams.ismedia,
  });
  const posts = await filterPosts(filter);

  return (
    <div className="content">
      <div className="full-width flex-column">
        <h3 className="title">{params?.name.toUpperCase()}</h3>
        {posts.totalItems > 0 ? (
          <>
            <Pager data={posts} filter={filter} />
            <section className="flex-column main-blog posts">
              <BlogPost user={null} data={posts.data} />
            </section>
          </>
        ) : (
          <h5>Couldn't find anything under this category.</h5>
        )}
      </div>
    </div>
  );
}
