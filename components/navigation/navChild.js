import React, { useState } from "react";
import Link from "next/link";

import useVersion from "../../lib/useVersion.js";

import navChildStyles from "./navChild.module.css";

const NavChild = ({ slug, page, color }) => {
  const [manualState, setManualState] = useState(null);
  const version = useVersion();

  const isNum = /^[\d\.]+$/.test(slug[0]);

  if (isNum) {
    slug.shift();
  }

  const slugStr = `/${slug.join("/")}`;
  const active = slugStr === page.url ? true : false;
  const shouldAutoOpen = slugStr.startsWith(page.url);
  const opened = manualState ?? shouldAutoOpen;

  let subNav;

  const toggleAccordion = () => {
    setManualState(!opened);
  };

  if (page.children?.length > 0 && opened) {
    subNav = (
      <ul
        className={`
          list-none
        `}
      >
        {page.children.map((child) => (
          <NavChild
            slug={slug}
            key={child.menu_key}
            page={child}
            color={color}
            depth={child.depth + 1}
          />
        ))}
      </ul>
    );
  }

  let accordion;

  if (page.children?.length > 0) {
    accordion = (
      <div
        className="
          border
          rounded-md
          transition-all
          ml-2
          flex items-center justify-center
          hover:opacity-50
          h-4 w-4
        "
      >
        <i
          className={`
            relative
            z-10
            cursor-pointer
            text-sm
            ${opened ? "close" : "open"}
          `}
          onClick={toggleAccordion}
        >
          {opened ? "remove" : "add"}
        </i>
      </div>
    );
  }

  let link;
  let icon;
  let target;
  let url = page.url;

  const isLocalPage = page.url.startsWith("/");

  if (!isLocalPage) {
    icon = (
      <i className="relative z-10 cursor-pointer text-sm ml-1">open_in_new</i>
    );
    target = "_blank";
  }

  if (page.isVersioned && version && isLocalPage) {
    // We need to version this URL, check if the URL has a version for this version
    const newSlug = page.url.split("/");
    newSlug[0] = version;
    url = `/${newSlug.join("/")}`;
  }

  link = (
    <span
      className={`
        flex items-center
        hover:opacity-70
      `}
    >
      <Link href={url}>
        <a
          className="
            flex items-center
            not-link
          "
          target={target}
        >
          <span
            className={`
              ${active ? "block" : "hidden"}
              absolute
              w-2 h-2
              -left-4
              rounded-full
              ${
                color === "violet-70"
                  ? "bg-indigo-70"
                  : color === "l-blue-70"
                  ? "bg-lightBlue-70"
                  : "bg-orange-70"
              }
            `}
          />
          <span className={active ? "font-bold text-gray-90" : ""}>
            {page.name}
          </span>
          {icon}
        </a>
      </Link>
      {accordion}
    </span>
  );

  return (
    <li
      className={`
        text-sm tracking-tight
        dark:text-white
        mb-4
        ${navChildStyles.Container}
      `}
    >
      {link}
      {subNav}
    </li>
  );
};

export default NavChild;
