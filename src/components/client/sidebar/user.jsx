"use client";

import { logout } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";
import ManageAvatar from "../user/settings/manageAvatar";

export default function User({ user, settings }) {
  const router = useRouter();

  return (
    <div className="user-sidebar flex-row">
      <ManageAvatar viewOnly={false} picture={settings?.picture} />
      <div className="profile flex-column">
        <h4>{user.Username}</h4>
        <div className="flex-row">
          <button
            className="btn-function"
            onClick={() => router.push("/user/settings")}
          >
            Edit profile
          </button>
          <button className="btn-function" onClick={() => logout()}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
