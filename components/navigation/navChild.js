import findIndex from "lodash/findIndex";
import React, { useState } from "react";
import { useRouter } from "next/router";

const NavChild = ({ page, slug, color, paths, version, maxVersion }) => {
  const router = useRouter();
  const slugStr = router.asPath;
  const shouldAutoOpen = slugStr.startsWith(page.url);
  const [manualState, setManualState] = useState(null);
  const opened = manualState ?? shouldAutoOpen;
  const active = slugStr === page.url ? true : false;
  let subNav;
  const isnum = /^[\d\.]+$/.test(slug[0]);

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
            paths={paths}
            version={version}
            maxVersion={maxVersion}
          />
        ))}
      </ul>
    );
  }

  let accordion;
  if (isnum) {
    slug.shift();
  }

  if (page.children?.length > 0) {
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

  if (!page.url.startsWith("/")) {
    icon = <i className="external">open_in_new</i>;
    target = "_blank";
  }

  let url = page.url;

  if (version && version !== maxVersion && page.url.startsWith("/")) {
    // We need to version this URL, Check if the URL has a version for this version
    const newSlug = page.url.split("/");
    newSlug[0] = version;
    const newUrl = `/${newSlug.join("/")}`;
    const index = findIndex(
      paths.paths,
      (path) => path.params.location === newUrl
    );
    if (index >= 0) {
      url = paths.paths[index].params.location;
    }
  }

  link = (
    <span className={`child-item ${active ? "active" : ""}`}>
      <a className="not-link" target={target} href={url}>
        <span className={`colored-ball bg-${color}`} />
        <span>{page.name}</span> {icon}
      </a>
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
