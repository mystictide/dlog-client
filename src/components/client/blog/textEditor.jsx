"use client";

import { buildHTMLText, buildLink, buildMedia } from "@/assets/js/helpers";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TextEditor({
  body,
  selection,
  SetSelection,
  setFormData,
  isMedia,
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
    e.preventDefault();
    if (selection) {
      let result = buildHTMLText(media ? "video" : "image", selection, body);
      SetSelection(null);
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
    } else {
      setModal((prevState) => ({
        ...prevState,
        mode: media,
        state: true,
      }));
    }
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

  const onMediaChange = (value) => {
    let result = buildMedia(modalState?.mode, body, value);
    setFormData((prevState) => ({
      ...prevState,
      body: result,
    }));
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
                {isMedia ? (
                  <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="enter url"
                    onChange={(e) => onMediaChange(e.target.value)}
                  />
                ) : (
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
                )}

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
                  {isMedia ? (
                    <button
                      aria-label="add media"
                      type="submit"
                      className="btn-function"
                    >
                      Add Media
                    </button>
                  ) : (
                    <>
                      {modalState.mode === "anchor" ? (
                        <button
                          aria-label="add link"
                          type="button"
                          className="btn-function"
                          onClick={() => handleLinkSet()}
                        >
                          Add Link
                        </button>
                      ) : (
                        <button
                          aria-label="add media"
                          type="button"
                          className="btn-function"
                          onClick={() => handleMediaSet()}
                        >
                          Add Media
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        ""
      )}

      {!isMedia ? (
        <div className="text-editor flex-row">
          <button
            aria-label="header"
            type="button"
            className="btn-function"
            onClick={(e) => handleTextEdit(e, "headify")}
          >
            <h3>header</h3>
          </button>
          <button
            aria-label="small"
            type="button"
            className="btn-function"
            onClick={(e) => handleTextEdit(e, "tinify")}
          >
            <small>small</small>
          </button>
          <button
            aria-label="bold"
            type="button"
            className="btn-function"
            onClick={(e) => handleTextEdit(e, "boldify")}
          >
            <b>bold</b>
          </button>
          <button
            aria-label="italic"
            type="button"
            className="btn-function"
            onClick={(e) => handleTextEdit(e, "italify")}
          >
            <i>italic</i>
          </button>
          <button
            aria-label="underscore"
            type="button"
            className="btn-function"
            onClick={(e) => handleTextEdit(e, "underscore")}
          >
            <u>underscore</u>
          </button>
          <button
            aria-label="link"
            type="button"
            className="btn-function"
            onClick={(e) => handleLink(e)}
          >
            link
          </button>
          <button
            aria-label="image"
            type="button"
            className="btn-function"
            onClick={(e) => handleMedia(e, false)}
          >
            image
          </button>
          <button
            aria-label="video"
            type="button"
            className="btn-function"
            onClick={(e) => handleMedia(e, true)}
          >
            video
          </button>
        </div>
      ) : (
        <div className="text-editor flex-row">
          <button
            type="button"
            className="btn-function"
            onClick={(e) => handleMedia(e, false)}
          >
            image
          </button>
          <button
            type="button"
            className="btn-function"
            onClick={(e) => handleMedia(e, true)}
          >
            video
          </button>
        </div>
      )}
    </>
  );
}
