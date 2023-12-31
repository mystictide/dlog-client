"use client";

import { togglePost } from "@/actions/blog/actions";
import { useState } from "react";

export default function PostFunctions({ post }) {
  const [activityState, setActivityState] = useState(post.IsActive);

  const handleActivity = async (state) => {
    let reqData = {
      id: post.ID,
      isactive: state,
    };
    let res = await togglePost(reqData);
    setActivityState(res);
  };

  return (
    <div className="flex-row">
      <a
        aria-label="edit"
        href={`/blog/manage/${post.ID}`}
        className="anchor-function"
      >
        Edit
      </a>
      <button
        aria-label="hide"
        className={`btn-function ${activityState === true ? "" : "active"}`}
        onClick={() => handleActivity(!activityState)}
      >
        {activityState ? "Hide" : "Hidden"}
      </button>
    </div>
  );
}
