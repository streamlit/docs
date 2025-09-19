import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import styles from "./navChild.module.css";
import { looksLikeVersionAndPlatformString } from "../../lib/next/utils";

const NavChild = ({ slug, page, color, className }) => {
  const [manualState, setManualState] = useState(null);
  if (looksLikeVersionAndPlatformString(slug[0])) {
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

  const visibleItems = page.children.filter((child) => child.visible !== false);
  if (page.children?.length > 0 && visibleItems.length > 0 && opened) {
    subNav = (
      <ul className={styles.List}>
        {page.children
          .filter((child) => child.visible !== false)
          .map((child) => (
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

  if (page.children?.length > 0 && visibleItems.length > 0) {
    accordion = (
      <div className={styles.Accordion}>
        <i
          className={classNames(
            styles.AccordionIcon,
            opened ? "close" : "open",
          )}
          onClick={toggleAccordion}
        >
          {opened ? "remove" : "add"}
        </i>
      </div>
    );
  }

  let navElement;
  let icon;
  let target;
  let url = page.url || ""; //Unset or empty url designates a divider

  const isRelativePath = url.startsWith("/");
  // Passing an absolute, docs.streamlit.io path indicates a duplicate or
  // cross-link in the menu. The full https:// path is required to simplify
  // string replacement later when it is converted to a relative path (for
  // performance and versioning).
  const isAbsolutePath = url.startsWith("https://docs.streamlit.io");
  const isDivider = url === "";
  const isExternal = !isRelativePath && !isAbsolutePath && !isDivider;

  if (isExternal) {
    icon = <i className={styles.ExternalIcon}>open_in_new</i>;
    target = "_blank";
  }

  if (isAbsolutePath) {
    url = url.replace("https://docs.streamlit.io", "");
    icon = <i className={styles.CrossLinkedIcon}>link</i>;
  }

  if (isDivider && page.name == "---") {
    navElement = (
      <div className={styles.LinkContainer}>
        <hr className={styles.DividerLine} />
      </div>
    );
  } else if (isDivider) {
    navElement = (
      <div className={styles.LinkContainer}>
        <span className={styles.DividerText}>{page.name}</span>
        <hr className={styles.DividerLine} />
      </div>
    );
  } else {
    navElement = (
      <div className={styles.LinkContainer}>
        <Link
          href={url}
          className={classNames("not-link", styles.Link)}
          target={target}
        >
          <span
            className={classNames(
              styles.Circle,
              active ? styles.ActiveCircle : "",
              CIRCLE_CLASS[color],
            )}
          />
          <span
            className={classNames(styles.PageName, active && styles.ActivePage)}
          >
            {page.name}
          </span>
          {page.isDeprecated === true ? (
            <i className={classNames("material-icons-sharp", styles.Icon)}>
              {"delete"}
            </i>
          ) : (
            icon
          )}
        </Link>
        {accordion}
      </div>
    );
  }

  return (
    <li className={classNames(styles.Container, className)}>
      {navElement}
      {subNav}
    </li>
  );
};

const CIRCLE_CLASS = {
  "red-70": styles.RedCircle,
  "orange-70": styles.OrangeCircle,
  "yellow-70": styles.YellowCircle,
  "green-70": styles.GreenCircle,
  "acqua-70": styles.AcquaCircle,
  "lightBlue-70": styles.LightBlueCircle,
  "darkBlue-70": styles.DarkBlueCircle,
  "indigo-70": styles.IndigoCircle,
  "gray-70": styles.GrayCircle,
  unset: styles.TransparentCircle,
};

export default NavChild;
