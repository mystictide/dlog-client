"use client";

import { managePost } from "@/actions/blog/actions";
import { formatPrettyURL } from "@/assets/js/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import TextEditor from "./textEditor";

export default function PostManager({ user, post, isMedia }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.Title ?? "",
    categoryid: post?.CategoryID ?? "default",
    body: post?.Body ?? "",
  });

  const { title, categoryid, body } = formData;

  const [selection, SetSelection] = useState(false);

  const handleTextSelection = (e) => {
    let text = window.getSelection().toString();
    if (text) {
      SetSelection(text);
    } else {
      SetSelection(null);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      id: post?.ID ?? null,
      title,
      categoryid,
      body,
      ismedia: post?.IsMedia ?? isMedia,
    };
    if (title && categoryid && body) {
      let res = await managePost(postData);
      if (res?.ID) {
        router.push(`/blog/post/${formatPrettyURL(res.Title)}-${res.ID}`);
      }
    } else {
      toast(
        "There was an error submitting, check for empty fields in the form."
      );
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/blog");
    }
  }, [user]);

  return (
    <div className="full-width">
      <form className="flex-column full-width" onSubmit={onSubmit}>
        <div className="flex-column full-width">
          <div className="title">
            <a className="interactive" aria-label="go back" href="/blog">
              <IoReturnDownBackSharp />
            </a>
            <h3>{isMedia ? "New Media" : "New Post"}</h3>
          </div>
          <div className="flex-row">
            <div className="post-manager half-width">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="enter a title"
                onChange={onChange}
              />
            </div>
            <div className="post-manager half-width">
              <select
                id="categoryid"
                name="categoryid"
                onChange={onChange}
                defaultValue={categoryid ?? "default"}
              >
                <option value="default" disabled>
                  select a category
                </option>
                <option value="1">Tech</option>
                <option value="2">Film</option>
                <option value="3">Music</option>
                <option value="4">Literature</option>
                <option value="5">Memes</option>
                <option value="6">Personal</option>
              </select>
            </div>
          </div>
          <div className="flex-column full-width post-manager">
            <TextEditor
              body={body}
              selection={selection}
              SetSelection={SetSelection}
              setFormData={setFormData}
              isMedia={isMedia}
            />
            {isMedia ? (
              ""
            ) : (
              <textarea
                type="text"
                id="body"
                name="body"
                value={body}
                placeholder="start typing..."
                onChange={onChange}
                onMouseUp={(e) => handleTextSelection(e)}
              />
            )}
          </div>
          {isMedia ? (
            ""
          ) : (
            <div className="full-width post-manager">
              <button
                aria-label="submit"
                type="submit"
                className="btn-function"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
