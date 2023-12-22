"use server";

import { buildFilterURL } from "@/assets/js/helpers";

export default async function Pager({ data, filter }) {
  return (
    <>
      {data.filter.pager.TotalPages > 1 ? (
        <div className="pager full-width">
          <h5 className="pager-info">
            found {data.totalItems} items, currently on page{" "}
            {data.filter.pager.CurrentPage}
          </h5>
          <ul className="flex-row h-list">
            {data.filter.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <a
                  className="pager-button"
                  aria-label={data.data[0].Category}
                  href={`/blog/c/${data.data[0].Category.toLowerCase()}/${buildFilterURL(
                    {
                      ...filter,
                      page: 1,
                    }
                  )}`}
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
                  aria-label={data.data[0].Category}
                  href={`/blog/c/${data.data[0].Category.toLowerCase()}/${buildFilterURL(
                    {
                      ...filter,
                      page: data.filter.pager.CurrentPage - 1,
                    }
                  )}`}
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
                  aria-label={data.data[0].Category}
                  href={`/blog/c/${data.data[0].Category.toLowerCase()}/${buildFilterURL(
                    {
                      ...filter,
                      page: data.filter.pager.CurrentPage + 1,
                    }
                  )}`}
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
                  aria-label={data.data[0].Category}
                  href={`/blog/c/${data.data[0].Category.toLowerCase()}/${buildFilterURL(
                    {
                      ...filter,
                      page: data.filter.pager.TotalPages,
                    }
                  )}`}
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
