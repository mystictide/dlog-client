"use client";

import { logout } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ManageAvatar from "../settings/manageAvatar";

export default function MobileUser({ settings }) {
  const router = useRouter();

  const [active, setActive] = useState(false);

  return (
    <div className="user-sidebar nav-user flex-row">
      <ManageAvatar
        viewOnly={true}
        picture={settings?.picture}
        setActive={setActive}
      />
      {active ? (
        <div className="modal-container">
          <div
            className="modal-overlay"
            onClick={() => {
              setActive(false);
            }}
          ></div>
          <div className="modal-content">
            <div className="modal-user flex-column">
              <ManageAvatar picture={settings?.picture} />
              <div className="profile flex-column">
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
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
