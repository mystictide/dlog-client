"use client";

import { logout } from "@/actions/auth/actions";
import { updateEmail, updatePassword } from "@/actions/user/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Settings({ user }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user ? user.Email : "");

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      email: email,
      token: user.Token,
    };
    let res = await updateEmail(reqData);
    if (res === true) {
      toast("Successfully updated email");
    } else {
      toast(res);
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    if (currentPassword && newPassword) {
      const reqData = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        token: user.Token,
      };
      let res = await updatePassword(reqData);
      if (res) {
        toast("Successfully updated password");
        await logout(reqData);
      } else {
        toast("Failed to update password");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/blog");
    }
  }, [user]);

  return (
    <div className="content">
      <div className="flex-column full-width">
        <div className="title">
          <IoReturnDownBack
            className="interactive"
            onClick={() => router.push("/blog")}
          />
          <h3>Account settings</h3>
        </div>
        <div className="flex-row">
          <div className="settings half-width">
            <form className="flex-column full-width" onSubmit={onEmailSubmit}>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn-function">Update Email</button>
            </form>
          </div>
          <div className="settings half-width">
            <form className="flex-column" onSubmit={onPasswordSubmit}>
              <div className="flex-row full-width">
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  placeholder={"Current password"}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  placeholder={"New password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button className="btn-function full-width">
                Update Password
              </button>
            </form>
          </div>
        </div>
        <div className="full-width settings">
          <form className="full-width" onSubmit={onEmailSubmit}>
            <button className="btn-function">Deactivate Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
