"use server";

import { viewUser } from "@/actions/main/actions";
import { decodeURL, readCookie } from "@/assets/js/helpers";
import UserInteractions from "@/components/client/user/profile/userIntereactions";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";
import BlogMedia from "@/components/server/blog/blogMedia";
import BlogPost from "@/components/server/blog/blogPost";
import UserSocials from "@/components/server/ui/userSocials";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const decodedUsername = decodeURL(params?.username);
  return {
    title: decodedUsername,
  };
}

export default async function UserProfile({ params }) {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const decodedUsername = decodeURL(params?.username);
  const profile = await viewUser(decodedUsername);

  return (
    <div className="content">
      <div className="full-width flex-column user-profile">
        <div className="author profile flex-row">
          <ManageAvatar viewOnly={true} picture={profile.UserImage} />
          <section className="bio flex-column">
            <h4>
              <a className="user-link" href={`/user/${profile.Username}`}>
                {profile.Username}
              </a>
            </h4>
            <h6>{profile.Socials.bio}</h6>
          </section>
          <section className="author-socials">
            <UserSocials socials={profile.Socials} />
          </section>
          <section className="author-stats flex-row">
            <span className="stat flex-column">
              <h5>{profile.UserStatistics.PostsCount}</h5>
              <h6>Posts</h6>
            </span>
            <span className="stat flex-column">
              <h5>{profile.UserStatistics.FollowingCount}</h5>
              <h6>Following</h6>
            </span>
            <span className="stat flex-column">
              <h5>{profile.UserStatistics.FollowersCount}</h5>
              <h6>Followers</h6>
            </span>
          </section>
          {user?.UID !== profile.UID ? (
            <UserInteractions
              user={user}
              target={profile.UID}
              stats={profile.UserStatistics}
            />
          ) : (
            ""
          )}
        </div>
        {profile.UserStatistics.IsBlockedYou ? (
          `You have been blocked by ${profile.Username}`
        ) : profile.UserStatistics.IsBlocked ? (
          `You have blocked ${profile.Username}`
        ) : (
          <>
            {profile.RecentPosts?.length > 0 &&
            profile.RecentMedia?.length > 0 ? (
              <div className="full-width flex-column">
                <h3 className="title">RECENT BLOG POSTS</h3>
                <section className="flex-column main-blog posts">
                  <BlogPost data={profile.RecentPosts} />
                </section>
                <h3 className="title">RECENT MEDIA</h3>
                <section className="flex-row main-blog media">
                  <BlogMedia data={profile.RecentMedia} />
                </section>
              </div>
            ) : (
              <h5>{profile.Username} has not yet posted anything</h5>
            )}
          </>
        )}
      </div>
    </div>
  );
}
