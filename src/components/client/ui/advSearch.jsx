"use client";

import { useRouter } from "next/navigation";

export default function AdvancedSearch({ filter }) {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    let text = e.target.keyword.value;
    let cat = e.target.category.value;
    let media = e.target.ismedia.checked;
    if (text.startsWith("@")) {
      router.push(
        `/blog/?author=${text.substring(
          1
        )}&category=${cat}&isadvanced=true&ismedia=${media}`
      );
    } else {
      router.push(
        `/blog/?keyword=${text}&category=${cat}&isadvanced=true&ismedia=${media}`
      );
    }
  };

  return (
    <div className="adv-search full-width">
      <form className="flex-row" onSubmit={onSubmit}>
        <input
          type="text"
          id="keyword"
          name="keyword"
          defaultValue={
            filter.keyword
              ? filter.keyword
              : filter.author
              ? `@${filter.author}`
              : ""
          }
          placeholder="...search by title or by @author"
        />
        <select
          id="category"
          name="category"
          defaultValue={filter.category ?? "default"}
        >
          <option value="default" disabled>
            select a category
          </option>
          <option value="0">Any</option>
          <option value="1">Tech</option>
          <option value="2">Film</option>
          <option value="3">Music</option>
          <option value="4">Literature</option>
          <option value="5">Memes</option>
          <option value="6">Personal</option>
        </select>
        <label htmlFor="ismedia" className="ismedia">
          Include Media?
          <input
            type="checkbox"
            id="ismedia"
            name="ismedia"
            defaultChecked={filter.ismedia}
          />
        </label>
        <button aria-label="search" type="submit" className="btn-function">
          Search
        </button>
      </form>
    </div>
  );
}
