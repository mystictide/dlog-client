"use client";

import { logout } from "@/actions/auth/actions";
import { formatPrettyURL } from "@/assets/js/helpers";
import ManageAvatar from "../user/settings/manageAvatar";

export default function User({ user, settings }) {
  return (
    <div className="user-sidebar flex-row">
      <ManageAvatar viewOnly={false} picture={settings?.picture} />
      <div className="profile flex-column">
        <h4>
          <a
            className="user-link"
            aria-label={user.Username}
            href={`/user/${formatPrettyURL(user.Username)}`}
          >
            {user.Username}
          </a>
        </h4>
        <div className="flex-row">
          <a
            className="anchor-function"
            aria-label="user settings"
            href={"/user/settings"}
          >
            Edit profile
          </a>
          <button
            aria-label="log out"
            className="btn-function"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
