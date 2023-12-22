"use client";

import { manageComment } from "@/actions/blog/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CommentManager({ post, comment }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: comment?.ID ?? "",
    postid: post.ID,
    body: comment?.Body ?? "",
  });

  const { id, postid, body } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      id,
      postid,
      body,
    };
    if (body) {
      let res = await manageComment(commentData);
      if (res?.ID) {
        toast("Comment posted!");
        setFormData((prevState) => ({
          ...prevState,
          body: "",
        }));
        router.refresh();
      }
    } else {
      toast(
        "There was an error submitting, check for empty fields in the form."
      );
    }
  };

  return (
    <div className="full-width">
      <form className="flex-column full-width" onSubmit={onSubmit}>
        <div className="flex-column full-width">
          <div className="title">
            <h3>Add Comment</h3>
          </div>
          <div className="flex-column full-width comment-manager">
            <textarea
              type="text"
              id="body"
              name="body"
              value={body}
              placeholder="start typing..."
              onChange={onChange}
            />
          </div>
          <div className="full-width comment-manager">
            <button aria-label="submit" type="submit" className="btn-function">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
