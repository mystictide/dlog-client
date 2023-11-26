"use client";

import { managePost } from "@/actions/blog/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import TextEditor from "./textEditor";

export default function PostManager({ user, post }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title ?? "",
    categoryid: post?.categoryid ?? "",
    body: post?.body ?? "",
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
    const postData = { id: post?.id ?? null, title, categoryid, body };
    let res = await managePost(postData);
    toast(res);
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
            <IoReturnDownBackSharp
              className="interactive"
              onClick={() => router.push("/blog")}
            />
            <h3>New Post</h3>
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
                defaultValue={"default"}
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
            />
            <textarea
              type="text"
              id="body"
              name="body"
              value={body}
              placeholder="start typing..."
              onChange={onChange}
              onMouseUp={(e) => handleTextSelection(e)}
            />
          </div>
          <div className="full-width post-manager">
            <button type="submit" className="btn-function">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
