"use client";

import { logout } from "@/actions/auth/actions";
import {
  updateBio,
  updateEmail,
  updatePassword,
  updateSocials,
} from "@/actions/user/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Settings({ user, settings }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user ? user.Email : "");
  const [bio, setBio] = useState(settings ? settings?.bio : "");
  const [socials, setSocials] = useState({
    facebook: settings?.facebook ?? null,
    instagram: settings?.instagram ?? null,
    linkedin: settings?.linkedin ?? null,
    twitter: settings?.twitter ?? null,
    youtube: settings?.youtube ?? null,
    personal: settings?.personal ?? null,
  });

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

  const onBioSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      bio: bio,
      token: user.Token,
    };
    let res = await updateBio(reqData);
    if (res === true) {
      toast("Successfully updated bio");
    } else {
      toast(res);
    }
  };

  const onSocialsSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      socials: socials,
      token: user.Token,
    };
    let res = await updateSocials(reqData);
    if (res === true) {
      toast("Successfully updated socials");
    } else {
      toast(res);
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
              <button aria-label="update email" className="btn-function">
                Update Email
              </button>
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
              <button
                aria-label="update password"
                className="btn-function full-width"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
        <div className="full-width settings">
          <form
            className="full-width flex-row socials"
            onSubmit={onSocialsSubmit}
          >
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={socials.facebook ?? ""}
              placeholder={socials.facebook ?? "Facebook"}
              onChange={(e) =>
                setSocials((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={socials.instagram ?? ""}
              placeholder={socials.instagram ?? "Instagram"}
              onChange={(e) =>
                setSocials((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              id="twitter"
              name="twitter"
              value={socials.twitter ?? ""}
              placeholder={socials.twitter ?? "Twitter"}
              onChange={(e) =>
                setSocials((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              id="youtube"
              name="youtube"
              value={socials.youtube ?? ""}
              placeholder={socials.youtube ?? "YouTube"}
              onChange={(e) =>
                setSocials((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={socials.linkedin ?? ""}
              placeholder={socials.linkedin ?? "LinkedIn"}
              onChange={(e) =>
                setSocials((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="text"
              id="personal"
              name="personal"
              value={socials.personal ?? ""}
              placeholder={socials.personal ?? "Personal"}
              onChange={(e) =>
                setSocials((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <button
              aria-label="update socials"
              className="btn-function full-button"
            >
              Update Socials
            </button>
          </form>
        </div>
        <div className="full-width settings">
          <form className="full-width" onSubmit={onBioSubmit}>
            <textarea
              type="text"
              id="bio"
              name="bio"
              value={bio}
              placeholder={bio ?? "start typing.."}
              onChange={(e) => setBio(e.target.value)}
            />
            <button
              aria-label="update bio"
              className="btn-function full-button"
            >
              Update Bio
            </button>
          </form>
        </div>
        <div className="full-width settings">
          <form className="full-width" onSubmit={onEmailSubmit}>
            <button
              aria-label="deactivate account"
              className="btn-function full-button"
            >
              Deactivate Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
