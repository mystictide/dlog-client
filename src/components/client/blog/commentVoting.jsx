"use client";

import { manageCommentVote } from "@/actions/blog/actions";
import { useState } from "react";
import { RiArrowLeftDownLine, RiArrowRightUpLine } from "react-icons/ri";

export default function CommentVoting({ user, comment }) {
  const [voteCount, setVoteCount] = useState({
    upvotes: comment.Votes.Upvotes,
    downvotes: comment.Votes.Downvotes,
  });
  const { upvotes, downvotes } = voteCount;
  const [userVoteState, setUserVoteState] = useState(comment.UserVote);

  const handleVoting = async (vote) => {
    if (vote === null) {
      let res = await manageCommentVote(comment.ID, null);
      setUserVoteState(res.vote);
      setVoteCount({
        upvotes: res.votecount.Upvotes,
        downvotes: res.votecount.Downvotes,
      });
    }
    if (vote === true || vote === false) {
      let res = await manageCommentVote(comment.ID, vote);
      setUserVoteState(res.vote);
      setVoteCount({
        upvotes: res.votecount.Upvotes,
        downvotes: res.votecount.Downvotes,
      });
    }
  };

  return (
    <div className="flex-row comment-voting">
      <div className="flex-column vote">
        <button
          aria-label="vote up"
          className={`up ${userVoteState === true ? "active" : ""}`}
          onClick={() =>
            user
              ? user.UID != comment.UID
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
              ? user.UID != comment.UID
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
