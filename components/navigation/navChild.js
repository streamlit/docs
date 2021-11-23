import findIndex from "lodash/findIndex";
import React, { useState } from "react";
import Link from "next/link";

import useVersion from "../../lib/useVersion.js";

function NavChild(props) {
  const [manualState, setManualState] = useState(null);
  const version = useVersion();

  const isNum = /^[\d\.]+$/.test(props.slug[0]);

  if (isNum) {
    props.slug.shift();
  }

  const slugStr = `/${props.slug.join("/")}`;
  const active = slugStr === props.page.url ? true : false;
  const shouldAutoOpen = slugStr.startsWith(props.page.url);
  const opened = manualState ?? shouldAutoOpen;

  let subNav;

  const toggleAccordion = () => {
    setManualState(!opened);
  };

  if (page.children?.length > 0 && opened) {
    subNav = (
      <ul className="child-sub-nav">
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

  if (props.page.children?.length > 0) {
    accordion = (
      <i
        className={`accordion ${opened ? "close" : "open"}`}
        onClick={toggleAccordion}
      >
        {opened ? "remove" : "add"}
      </i>
    );
  }

  let link;
  let icon;
  let target;
  let url = props.page.url;

  const isLocalPage = props.page.url.startsWith("/");

  if (!isLocalPage) {
    icon = <i className="external">open_in_new</i>;
    target = "_blank";
  }

  if (
    props.page.isVersioned &&
    version &&
    isLocalPage
  ) {
    // We need to version this URL, check if the URL has a version for this version
    const newSlug = props.page.url.split("/");
    newSlug[0] = version;
    url = `/${newSlug.join("/")}`;
  }

  link = (
    <span className={`child-item ${active ? "active" : ""}`}>
      <Link href={url}>
        <a className="not-link" target={target}>
          <span className={`colored-ball bg-${props.color}`} />
          <span>{props.page.name}</span> {icon}
        </a>
      </Link>
      {accordion}
    </span>
  );

  return (
    <li className="child">
      {link}
      {subNav}
    </li>
  );
};

export default NavChild;
