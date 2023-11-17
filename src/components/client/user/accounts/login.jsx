"use client";
import { login } from "@/actions/auth/actions";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Login({ modalControl, setRegState }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    let res = await login(userData);
    toast(res);
  };

  return (
    <div className="modal-container">
      <div
        className="modal-overlay"
        onClick={() => {
          modalControl(false);
        }}
      ></div>
      <div className="modal-content">
        <section className="heading">
          <h1>Log in</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email address"
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
            <div className="functions">
              <button type="submit" className="btn-function">
                Sign in
              </button>
              <span onClick={() => setRegState(true)}>..or sign up</span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
