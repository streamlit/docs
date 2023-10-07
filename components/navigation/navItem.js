import React from "react";
import Link from "next/link";
import classNames from "classnames";

import { urlInChildren } from "../../lib/utils.js";
import NavChild from "./navChild";

import styles from "./navItem.module.css";

const NavItem = ({ page, slug, condensed, className }) => {
  let subNav;
  let navItem;
  let navBox;
  let active = urlInChildren(page, `/${slug.join("/")}`);
  let isCondensed = condensed ? condensed : false;

  // We only want the color to show when we're either active, or the menu is condensed.
  let color =
    page.color === "red-70"
      ? styles.GetStartedCategory
      : page.color === "violet-70"
      ? styles.LibraryCategory
      : page.color === "l-blue-70"
      ? styles.CloudCategory
      : page.color === "rainbow"
      ? styles.ContributeCategory
      : styles.KBCategory;
  color = isCondensed || active ? color : "";

  navBox = (
    <section
      className={classNames(
        styles.HeadingContainer,
        isCondensed ? styles.CondensedHeadingContainer : ""
      )}
    >
      <div
        className={classNames(
          styles.HeadingIconContainer,
          isCondensed ? styles.CondensedHeadingIconContainer : "",
          page.color === "red-70"
            ? styles.GetStartedIcon
            : page.color === "violet-70"
            ? styles.LibraryIcon
            : page.color === "l-blue-70"
            ? styles.CloudIcon
            : page.color === "rainbow"
            ? styles.ContributeIcon
            : styles.KBIcon
        )}
      >
        <i className={styles.Icon}>{page.icon}</i>
      </div>
      <p
        className={classNames(
          styles.CategoryName,
          isCondensed ? styles.CondensedCategoryName : "",
          color
        )}
      >
        {page.name}
      </p>
    </section>
  );

  if (page.children && page.children.length > 0) {
    subNav = (
      <ul
        className={classNames(
          styles.SubNav,
          isCondensed ? styles.CondensedSubNav : styles.ExpandedSubNav
        )}
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
      <li className={styles.NavItem} id={page.menu_key}>
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
      <li className={styles.NavItem} id={page.menu_key}>
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
