import React from "react";
import Link from "next/link";
import { urlInChildren } from "../../lib/utils.js";
import NavChild from "./navChild";

import navItemStyles from "./navItem.module.css";

const NavItem = ({ page, slug, condensed, className }) => {
  let subNav;
  let navItem;
  let navBox;
  let active = urlInChildren(page, `/${slug.join("/")}`);
  let isCondensed = condensed ? condensed : false;

  // We only want the color to show when we're either active, or the menu is condensed.
  let color = page.color ? `color-${page.color}` : "";
  color = isCondensed || active ? color : "";

  navBox = (
    <section
      className={`
        flex items-center
        lg:flex-wrap lg:justify-center lg:text-center lg:w-20
        xl:justify-start xl:flex-nowrap xl:text-left xl:w-auto
        transition-all
        ${navItemStyles.Headingcontainer}
      `}
    >
      <div
        className={`
          flex items-center
          p-2
          mr-4
          lg:mr-0
          xl:mr-4
          mb-0
          rounded-md
          ${
            page.color === "violet-70"
              ? "bg-indigo-70"
              : page.color === "l-blue-70"
              ? "bg-lightBlue-70"
              : "bg-orange-70"
          }
        `}
      >
        <i>{page.icon}</i>
      </div>
      <p
        className={`
          m-0
          lg:my-1 xl:my-0
          font-bold
          font-sans
          lg:text-xs xl:text-base
          lg:leading-tight xl:leading-6
          lg:tracking-tight
          dark:text-white
          ${
            page.color === "violet-70"
              ? "text-indigo-70"
              : page.color === "l-blue-70"
              ? "text-lightBlue-70"
              : "text-orange-70"
          }
        `}
      >
        {page.name}
      </p>
    </section>
  );

  if (page.children && page.children.length > 0) {
    subNav = (
      <ul
        className={`
          block
          pl-14
          m-0 mt-4
          list-none
        `}
      >
        {page.children.map((child) => (
          <NavChild
            slug={slug}
            page={child}
            color={page.color}
            key={child.menu_key}
            depth={child.depth + 1}
            className={className}
          />
        ))}
      </ul>
    );
  }

  if (page.url.startsWith("/")) {
    navItem = (
      <li
        className={`
          mb-8
        `}
        id={page.menu_key}
      >
        {page.url === "/library" ? (
          <a href={page.url} className="not-link">
            {navBox}
          </a>
        ) : (
          <Link href={page.url}>
            <a className="not-link">{navBox}</a>
          </Link>
        )}
        {subNav}
      </li>
    );
  } else {
    navItem = (
      <li
        className={`
          mb-8
        `}
        id={page.menu_key}
      >
        <a className="not-link" href={page.url} target="_blank">
          {navBox}
        </a>
        {subNav}
      </li>
    );
  }

  return navItem;
};

export default NavItem;
