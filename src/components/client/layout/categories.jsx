"use client";

import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";

export default function Categories() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="categories">
        <ul className="h-list">
          <li>
            <a href="/blog/c/tech">Tech</a>
          </li>
          <li>
            <a href="/blog/c/film">Film</a>
          </li>
          <li>
            <a href="/blog/c/music">Music</a>
          </li>
          <li>
            <a href="/blog/c/literature">Literature</a>
          </li>
          <li>
            <a href="/blog/c/memes">Memes</a>
          </li>
          <li>
            <a href="/blog/c/personal">Personal</a>
          </li>
        </ul>
      </div>
      <div className="mobile-categories">
        <span
          className="interactive"
          onClick={() => {
            setActive(true);
          }}
        >
          <BiSolidCategory />
        </span>
        {active ? (
          <div className="modal-container">
            <div
              className="modal-overlay"
              onClick={() => {
                setActive(false);
              }}
            ></div>
            <div className="modal-content">
              <ul className="v-list flex-column">
                <li>
                  <a href="/blog/c/tech">Tech</a>
                </li>
                <li>
                  <a href="/blog/c/film">Film</a>
                </li>
                <li>
                  <a href="/blog/c/music">Music</a>
                </li>
                <li>
                  <a href="/blog/c/literature">Literature</a>
                </li>
                <li>
                  <a href="/blog/c/memes">Memes</a>
                </li>
                <li>
                  <a href="/blog/c/personal">Personal</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
