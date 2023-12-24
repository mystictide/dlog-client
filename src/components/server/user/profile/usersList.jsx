"use server";

import { formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "@/components/client/user/settings/manageAvatar";

export default async function UsersList({ users }) {
  return (
    <section className="follow-list flex-row">
      {users?.map((user) => (
        <a
          aria-label={user.Username}
          href={`/user/${formatPrettyURL(user.Username)}`}
          key={user.UID}
        >
          <div className="author flex-column">
            <ManageAvatar viewOnly={true} picture={user.UserImage} />
          </div>
        </a>
      ))}
    </section>
  );
}
