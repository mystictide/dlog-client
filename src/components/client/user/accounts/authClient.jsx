"use client";
import { useState } from "react";
import { RiAccountPinBoxFill } from "react-icons/ri";
import Login from "./login";
import Register from "./register";

export default function AuthClient() {
  const [modalState, setModal] = useState(false);
  const [regState, setRegState] = useState(true);

  return (
    <>
      <div className="account">
        <ul className="h-list">
          <li>
            <button aria-label="account" onClick={() => setModal(!modalState)}>
              <RiAccountPinBoxFill />
            </button>
          </li>
        </ul>
      </div>
      {modalState ? (
        regState ? (
          <Register modalControl={setModal} setRegState={setRegState} />
        ) : (
          <Login modalControl={setModal} setRegState={setRegState} />
        )
      ) : (
        ""
      )}
    </>
  );
}
