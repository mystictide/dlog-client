"use client";

import { logout } from "@/actions/auth/actions";
import ManageAvatar from "../user/settings/manageAvatar";

export default function User({ user, settings }) {
  return (
    <div className="user-sidebar flex-row">
      <ManageAvatar viewOnly={false} picture={settings?.picture} />
      <div className="profile flex-column">
        <h4>{user.Username}</h4>
        <div className="flex-row">
          <a className="anchor-function" href={"/user/settings"}>
            Edit profile
          </a>
          <button className="btn-function" onClick={() => logout()}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
