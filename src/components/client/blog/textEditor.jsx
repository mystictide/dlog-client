"use client";

import { buildHTMLText, buildLink, buildMedia } from "@/assets/js/helpers";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TextEditor({
  body,
  selection,
  SetSelection,
  setFormData,
}) {
  const [modalState, setModal] = useState({
    mode: null,
    state: false,
  });
  const [userInput, setUserInput] = useState({
    url: "",
    text: "",
  });
  const { url, text } = userInput;

  const handleTextEdit = (e, method) => {
    e.preventDefault();
    if (selection) {
      let result = buildHTMLText(method, selection, body);
      SetSelection(null);
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
    } else {
      toast.info("No text selected.");
    }
  };

  const handleLink = (e) => {
    e.preventDefault();
    if (selection) {
      let result = buildHTMLText("linkify", selection, body);
      SetSelection(null);
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
    } else {
      setModal((prevState) => ({
        ...prevState,
        mode: "anchor",
        state: true,
      }));
    }
  };

  const handleLinkSet = (e) => {
    if (url && text) {
      let result = buildLink(body, url, text);
      SetSelection(null);
      setUserInput((prevState) => ({
        ...prevState,
        url: "",
        text: "",
      }));
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
      setModal((prevState) => ({
        ...prevState,
        mode: "",
        state: false,
      }));
    } else {
      toast.info("Missing section.");
    }
  };

  const handleMedia = (e, media) => {
    setModal((prevState) => ({
      ...prevState,
      mode: media,
      state: true,
    }));
  };

  const handleMediaSet = () => {
    if (url) {
      let result = buildMedia(modalState?.mode, body, url);
      SetSelection(null);
      setUserInput((prevState) => ({
        ...prevState,
        url: "",
        text: "",
      }));
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
      setModal((prevState) => ({
        ...prevState,
        mode: "",
        state: false,
      }));
    } else {
      toast.info("Missing section.");
    }
  };

  return (
    <>
      {modalState.state ? (
        <div className="modal-container">
          <div
            className="modal-overlay"
            onClick={() => {
              setModal((prevState) => ({
                ...prevState,
                mode: "",
                state: false,
              }));
            }}
          ></div>
          <div className="modal-content">
            <section>
              <div className="flex-column align-center">
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={url}
                  placeholder="enter url"
                  onChange={(e) =>
                    setUserInput((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
                {modalState.mode === "anchor" ? (
                  <input
                    type="text"
                    id="text"
                    name="text"
                    value={text}
                    placeholder="enter text for url"
                    onChange={(e) =>
                      setUserInput((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  ""
                )}
                <div className="functions">
                  {modalState.mode === "anchor" ? (
                    <button
                      type="submit"
                      className="btn-function"
                      onClick={() => handleLinkSet()}
                    >
                      Add Link
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-function"
                      onClick={() => handleMediaSet()}
                    >
                      Add Media
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="text-editor flex-row">
        <button
          className="btn-function"
          onClick={(e) => handleTextEdit(e, "headify")}
        >
          <h3>header</h3>
        </button>
        <button
          className="btn-function"
          onClick={(e) => handleTextEdit(e, "tinify")}
        >
          <small>small</small>
        </button>
        <button
          className="btn-function"
          onClick={(e) => handleTextEdit(e, "boldify")}
        >
          <b>bold</b>
        </button>
        <button
          className="btn-function"
          onClick={(e) => handleTextEdit(e, "italify")}
        >
          <i>italic</i>
        </button>
        <button
          className="btn-function"
          onClick={(e) => handleTextEdit(e, "underscore")}
        >
          <u>underscore</u>
        </button>
        <button className="btn-function" onClick={(e) => handleLink(e)}>
          link
        </button>
        <button className="btn-function" onClick={(e) => handleMedia(e, false)}>
          image
        </button>
        <button className="btn-function" onClick={(e) => handleMedia(e, true)}>
          video
        </button>
      </div>
    </>
  );
}
