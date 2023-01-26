import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import useVersion from "../../lib/useVersion.js";

import styles from "./navChild.module.css";

const NavChild = ({ slug, page, color, className }) => {
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
            opened ? "close" : "open"
          )}
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
    icon = <i className={styles.ExternalIcon}>open_in_new</i>;
    target = "_blank";
  }

  if (page.isVersioned && version && isLocalPage) {
    // We need to version this URL, check if the URL has a version for this version
    const newSlug = page.url.split("/");
    newSlug[0] = version;
    url = `/${newSlug.join("/")}`;
  }

  link = (
    <span className={styles.LinkContainer}>
      <Link href={url}>
        <a className={classNames("not-link", styles.Link)} target={target}>
          <span
            className={classNames(
              styles.Circle,
              active ? styles.ActiveCircle : "",
              color === "violet-70"
                ? styles.LibraryCircle
                : color === "l-blue-70"
                ? styles.CloudCircle
                : styles.KBCircle
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
        </a>
      </Link>
      {accordion}
    </span>
  );

  return (
    <li className={classNames(styles.Container, className)}>
      {link}
      {subNav}
    </li>
  );
};

export default NavChild;
