"use client";

import { manageBlock, manageFollow } from "@/actions/user/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserInteractions({ target, stats }) {
  const router = useRouter();
  const [followState, setFollowState] = useState(stats.IsFollowing);
  const [blockState, setBlockState] = useState(stats.IsBlocked);

  const handleFollowing = async () => {
    let res = await manageFollow(target);
    setFollowState(res);
    router.refresh();
  };

  const handleBlocking = async () => {
    let res = await manageBlock(target);
    setBlockState(res);
    router.refresh();
  };

  return (
    <section className="author-functions flex-row">
      {!stats.IsBlockedYou ? (
        <div className="function flex-column">
          <button
            type="submit"
            className={`btn-function ${followState ? "active" : ""}`}
            onClick={() => handleFollowing()}
          >
            {followState ? "Following" : "Follow"}
          </button>
          {stats.IsFollowingYou ? <h6>Follows you</h6> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="function flex-column">
        <button
          type="submit"
          className={`btn-function ${blockState ? "active" : ""}`}
          onClick={() => handleBlocking()}
        >
          Block
        </button>
      </div>
    </section>
  );
}
