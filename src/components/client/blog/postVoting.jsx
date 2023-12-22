"use client";

import { managePostVote } from "@/actions/blog/actions";
import { useState } from "react";
import { RiArrowLeftDownLine, RiArrowRightUpLine } from "react-icons/ri";

export default function PostVoting({ user, post }) {
  const [voteCount, setVoteCount] = useState({
    upvotes: post.Votes.Upvotes,
    downvotes: post.Votes.Downvotes,
  });
  const { upvotes, downvotes } = voteCount;
  const [userVoteState, setUserVoteState] = useState(post.UserVote);

  const handleVoting = async (vote) => {
    if (vote === null) {
      let res = await managePostVote(post.ID, null);
      setUserVoteState(res.vote);
      setVoteCount({
        upvotes: res.votecount.Upvotes,
        downvotes: res.votecount.Downvotes,
      });
    }
    if (vote === true || vote === false) {
      let res = await managePostVote(post.ID, vote);
      setUserVoteState(res.vote);
      setVoteCount({
        upvotes: res.votecount.Upvotes,
        downvotes: res.votecount.Downvotes,
      });
    }
  };

  return (
    <div className="full-width flex-row post-voting">
      <div className="flex-column vote">
        <button
          aria-label="vote up"
          className={`up ${userVoteState === true ? "active" : ""}`}
          onClick={() =>
            user
              ? user.UID != post.UID
                ? handleVoting(userVoteState === true ? null : true)
                : undefined
              : undefined
          }
        >
          <RiArrowRightUpLine />
        </button>
        <label>{upvotes}</label>
      </div>
      <div className="flex-column vote">
        <button
          aria-label="vote down"
          className={`down ${userVoteState === false ? "active" : ""}`}
          onClick={() =>
            user
              ? user.UID != post.UID
                ? handleVoting(userVoteState === false ? null : false)
                : undefined
              : undefined
          }
        >
          <RiArrowLeftDownLine />
        </button>
        <label>{downvotes}</label>
      </div>
    </div>
  );
}
