"use client";

import Link from "next/link";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";

export default function Categories() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="categories">
        <ul className="h-list">
          <li>
            <Link href="/blog/c/tech">Tech</Link>
          </li>
          <li>
            <Link href="/blog/c/film">Film</Link>
          </li>
          <li>
            <Link href="/blog/c/music">Music</Link>
          </li>
          <li>
            <Link href="/blog/c/literature">Literature</Link>
          </li>
          <li>
            <Link href="/blog/c/memes">Memes</Link>
          </li>
          <li>
            <Link href="/blog/c/personal">Personal</Link>
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
                  <Link href="/blog/c/tech">Tech</Link>
                </li>
                <li>
                  <Link href="/blog/c/film">Film</Link>
                </li>
                <li>
                  <Link href="/blog/c/music">Music</Link>
                </li>
                <li>
                  <Link href="/blog/c/literature">Literature</Link>
                </li>
                <li>
                  <Link href="/blog/c/memes">Memes</Link>
                </li>
                <li>
                  <Link href="/blog/c/personal">Personal</Link>
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
