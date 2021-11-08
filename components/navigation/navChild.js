import findIndex from "lodash/findIndex";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavChild(props) {
  const router = useRouter();
  const slugStr = router.asPath;
  const shouldAutoOpen = slugStr.startsWith(props.page.url);
  const [manualState, setManualState] = useState(null);
  const opened = manualState ?? shouldAutoOpen;

  const active = slugStr === props.page.url ? true : false;

  let subNav;

  const isnum = /^[\d\.]+$/.test(props.slug[0]);
  // if (isnum) {
  //   props.slug.shift();
  // }

  const toggleAccordion = () => {
    setManualState(!opened);
  };

  if (props.page.children?.length > 0 && opened) {
    subNav = (
      <ul className="child-sub-nav">
        {props.page.children.map((child, index) => (
          <NavChild
            slug={props.slug}
            key={child.menu_key}
            page={child}
            color={props.color}
            depth={child.depth + 1}
            paths={props.paths}
            version={props.version}
            maxVersion={props.maxVersion}
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

  if (!props.page.url.startsWith("/")) {
    icon = <i className="external">open_in_new</i>;
    target = "_blank";
  }

  let url = props.page.url;

  if (
    props.paths &&
    props.version &&
    props.version !== props.maxVersion &&
    props.page.url.startsWith("/")
  ) {
    // We need to version this URL, Check if the URL has a version for this version
    const newSlug = props.page.url.split("/");
    newSlug[0] = props.version;
    const newUrl = `/${newSlug.join("/")}`;
    const index = findIndex(
      props.paths.paths,
      (path) => path.params.location === newUrl
    );
    if (index >= 0) {
      url = props.paths.paths[index].params.location;
    }
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
}

export default NavChild;
