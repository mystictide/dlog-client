"use client";

import { manageAvatar } from "@/actions/user/actions";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ManageAvatar() {
  const [image, setImage] = useState(null);

  const handleAvatar = async (e) => {
    const formData = new FormData();
    if (e.target.files[0]) {
      formData.append("file", e.target.files[0], e.target.files[0].name);
      setImage(formData);
      let res = await manageAvatar(formData);
      toast(res);
    }
  };

  return (
    <div className="avatar">
      <div className="avatar-view">
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
        <FaUser className="default" />
      </div>
    </div>
  );
}
