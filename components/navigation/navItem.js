import React from "react";
import Link from "next/link";
import classNames from "classnames";

import { urlInChildren } from "../../lib/purejs/breadcrumbHelpers";
import NavChild from "./navChild";

import styles from "./navItem.module.css";

const NavItem = ({ page, slug, condensed, className }) => {
  let subNav;
  let navItem;
  let navBox;
  let active = urlInChildren(page, `/${slug.join("/")}`);
  let isCondensed = condensed ? condensed : false;

  // We only want the color to show when we're either active, or the menu is condensed.
  let fgColor = FG_CLASS[page.color];
  fgColor = isCondensed || active ? fgColor : "";

  const bgColor = BG_CLASS[page.color];

  navBox = (
    <section
      className={classNames(
        styles.HeadingContainer,
        isCondensed ? styles.CondensedHeadingContainer : "",
      )}
    >
      <div
        className={classNames(
          styles.HeadingIconContainer,
          isCondensed ? styles.CondensedHeadingIconContainer : "",
          bgColor,
        )}
      >
        <i className={styles.Icon}>{page.icon}</i>
      </div>
      <p
        className={classNames(
          styles.CategoryName,
          isCondensed ? styles.CondensedCategoryName : "",
          fgColor,
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
          isCondensed ? styles.CondensedSubNav : styles.ExpandedSubNav,
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
        <Link className="not-link" href={page.url}>
          {navBox}
        </Link>
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

const BG_CLASS = {
  "red-70": styles.RedBackground,
  "orange-70": styles.OrangeBackground,
  "yellow-70": styles.YellowBackground,
  "green-70": styles.GreenBackground,
  "acqua-70": styles.AcquaBackground,
  "lightBlue-70": styles.LightBlueBackground,
  "darkBlue-70": styles.DarkBlueBackground,
  "indigo-70": styles.IndigoBackground,
  "gray-70": styles.GrayBackground,
  unset: styles.TransparentBackground,
};

const FG_CLASS = {
  "red-70": styles.RedForeground,
  "orange-70": styles.OrangeForeground,
  "yellow-70": styles.YellowForeground,
  "green-70": styles.GreenForeground,
  "acqua-70": styles.AcquaForeground,
  "lightBlue-70": styles.LightBlueForeground,
  "darkBlue-70": styles.DarkBlueForeground,
  "indigo-70": styles.IndigoForeground,
  "gray-70": styles.GrayForeground,
  unset: styles.TransparentForeground,
};

export default NavItem;
