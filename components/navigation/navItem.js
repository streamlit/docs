import React from "react";
import Link from "next/link";
import { urlInChildren } from "../../lib/utils.js";
import NavChild from "./navChild";

const NavItem = ({
  page,
  offScreen,
  slug,
  condensed,
  paths,
  version,
  maxVersion,
}) => {
  let subNav;
  let navItem;
  let navBox;
  let active = urlInChildren(page, `/${slug.join("/")}`);
  let isCondensed = condensed ? condensed : false;

  // We only want the color to show when we're either active, or the menu is condensed.
  let color = page.color ? `color-${page.color}` : "";
  color = isCondensed || active ? color : "";

  navBox = (
    <section className={`head ${active ? "active" : ""}`}>
      <div className={`icon-box bg-${page.color}`}>
        <i>{page.icon}</i>
      </div>
      <p className={`bold large ${color}`}>{page.name}</p>
    </section>
  );

  if (page.children && page.children.length > 0) {
    subNav = (
      <ul className="sub-nav">
        {page.children.map((child) => (
          <NavChild
            slug={slug}
            page={child}
            color={page.color}
            key={child.menu_key}
            depth={child.depth + 1}
          />
        ))}
      </ul>
    );
  }

  if (page.url.startsWith("/")) {
    navItem = (
      <li className="nav-item small" id={page.menu_key}>
        <a className="not-link" href={page.url}>
          {navBox}
        </a>
        {subNav}
      </li>
    );
  } else {
    navItem = (
      <li className="nav-item small" id={page.menu_key}>
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
