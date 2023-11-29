"use client";

import { manageAvatar } from "@/actions/user/actions";
import Image from "next/image";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ManageAvatar({ viewOnly, picture, setActive }) {
  const [image, setImage] = useState(null);

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAvatar = async (e) => {
    const formData = new FormData();
    if (e.target.files[0]) {
      formData.append("file", e.target.files[0], e.target.files[0].name);
      let res = await manageAvatar(formData);
      if (res?.success) {
        setImage(res?.picture + `?${randomNumberInRange(0, 25)}`);
      }
      if (res?.error) {
        toast(res?.error.message);
      }
    }
  };

  return (
    <div
      className="avatar"
      onClick={() => (setActive ? setActive((prev) => !prev) : undefined)}
    >
      <div className="avatar-view">
        {viewOnly ? (
          ""
        ) : (
          <div className="avatar-overlay">
            <input
              type="file"
              className="form-control"
              id="picture"
              name="picture"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleAvatar}
            />
            <BiImageAdd className="editor" />
          </div>
        )}

        {image ? (
          <Image src={image} width="80" height="80" alt="userAvatar" />
        ) : picture ? (
          <Image src={picture} width="80" height="80" alt="userAvatar" />
        ) : (
          <FaUser className="default" />
        )}
      </div>
    </div>
  );
}
