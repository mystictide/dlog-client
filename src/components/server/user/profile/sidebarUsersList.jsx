"use server";

import { formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";

export default async function SidebarUsersList({ data }) {
  return (
    <>
      {data?.map((user) => (
        <a
          className="hyper-user"
          aria-label={user.Username}
          href={`/user/${formatPrettyURL(user.Username)}`}
          key={user.UID}
        >
          <div className="post-container flex-column">
            <div className={"flex-column"}>
              <div className="author flex-row">
                <ManageAvatar viewOnly={true} picture={user.UserImage} />
                <div className="flex-column">
                  <h5>{user.Username}</h5>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
