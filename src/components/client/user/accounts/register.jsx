"use client";
import {
  checkExistingEmail,
  checkExistingUsername,
  register,
} from "@/actions/auth/actions";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BarLoader } from "react-spinners";

export default function Register({ modalControl, setRegState }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    vPassword: true,
  });
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const { username, email, password } = formData;
  const { vPassword } = formValidation;

  useEffect(() => {
    const validateUsername = setTimeout(async () => {
      if (username.length > 0) {
        let res = await checkExistingUsername(username);
        if (res === "false") {
          setUsernameExists(false);
        } else {
          setUsernameExists(true);
        }
      }
    }, 2000);
    return () => clearTimeout(validateUsername);
  }, [username, usernameExists, setUsernameExists, checkExistingUsername]);

  useEffect(() => {
    const validateMail = setTimeout(async () => {
      if (email.length > 0) {
        let res = await checkExistingEmail(email);
        if (res === "false") {
          setEmailExists(false);
        } else {
          setEmailExists(true);
        }
      }
    }, 2000);
    return () => clearTimeout(validateMail);
  }, [email, emailExists, setEmailExists]);

  useEffect(() => {
    const validatePassword = setTimeout(() => {
      if (password.length > 6) {
        setFormValidation((prevState) => ({
          ...prevState,
          vPassword: false,
        }));
      } else {
        setFormValidation((prevState) => ({
          ...prevState,
          vPassword: true,
        }));
      }
    }, 2000);
    return () => clearTimeout(validatePassword);
  }, [password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    if (!vPassword && !usernameExists && !emailExists) {
      await register(userData);
    }
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
          <h1>Join up!</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section className="account-form">
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="enter your username"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {usernameExists ? (
              <label className="error">Username already exists</label>
            ) : (
              ""
            )}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="enter an email address"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {emailExists ? (
              <label className="error">Email address already registered</label>
            ) : (
              ""
            )}
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="set a password"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {vPassword ? (
              <label className="error">
                Password requires more than 6 characters
              </label>
            ) : (
              ""
            )}
            <div className="functions">
              {vPassword || usernameExists || emailExists ? (
                <button
                  aria-label="loading"
                  type="button"
                  className="btn-loading"
                >
                  <BarLoader
                    color="#b2533e"
                    height={10}
                    loading
                    speedMultiplier={0.6}
                    width={300}
                  />
                </button>
              ) : (
                <>
                  <button
                    aria-label="sign up"
                    type="submit"
                    className="btn-function"
                  >
                    Sign up
                  </button>
                </>
              )}
              <span onClick={() => setRegState(false)}>..or log in</span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
