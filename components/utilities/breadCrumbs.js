import React from "react";
import Link from "next/link";

import { breadcrumbsForSlug } from "../../lib/purejs/breadcrumbHelpers";
import { looksLikeVersionAndPlatformString } from "../../lib/next/utils";

import styles from "./breadCrumbs.module.css";

const BreadCrumbs = ({ slug, menu }) => {
  const formatedTitle = (title) => {
    return `${title}`.replace(/\-/g, " ").replace(/\bapi\b/, "API");
  };

  const createCrumb = (crumb, index, slug) => {
    let formatedCrumb;
    if (index == slug.length) {
      formatedCrumb = (
        <Link
          href={crumb.link}
          className={`not-link ${styles.ActiveLink} ${styles.Link}`}
        >
          {crumb.title}
        </Link>
      );
    } else {
      formatedCrumb = (
        <>
          <Link href={crumb.link} className={`not-link ${styles.Link}`}>
            {crumb.title}
          </Link>
          <span className={styles.Separator}>/</span>
        </>
      );
    }
    return formatedCrumb;
  };

  const breadcrumbs = [];
  if (slug === undefined) {
    return "";
  }
  let paths = slug.join("/");
  breadcrumbs.push({
    link: "/",
    title: "Home",
  });

  // TODO: This may be unnecessary
  if (looksLikeVersionAndPlatformString(slug[0])) {
    paths = slug.slice(1).join("/");
    breadcrumbs.push({
      link: "#",
      title: slug[0],
    });
  }

  // Find the menu with the current slug
  const location = `/${paths}`;
  const path = breadcrumbsForSlug(menu, location, []);

  // If there's a missing entry in menu.md, throw a build error.
  // But first, we should exclude files that aren't pages.
  const filesToExclude = [];

  // Let's start with files that start with a dot, such as .keep and .DS_Store
  if (slug.slice()[0].startsWith(".")) {
    filesToExclude.push(slug.slice().join("/"));
  }

  // Then, we add a couple pages that don't need breadcrumbs, such as /menu, /index, etc.
  filesToExclude.push("index", "gdpr-banner", "menu", "cookie-settings");

  // Now, we throw the error if any page that's not on the filesToExclude array is missing in menu.md
  if (path.length === 0 && !filesToExclude.includes(slug[0])) {
    throw new Error(
      `This slug: ${slug
        .slice()
        .join(
          "/",
        )} doesn't have a corresponding entry in menu.md. Please add it, and if you don't want this entry to show up in the sidebar, add the "visible: false" property to the entry.`,
    );
  }

  path.forEach((obj) => {
    if (obj.url === location) {
      breadcrumbs.push({
        link: location,
        title: formatedTitle(obj.name),
      });
    } else {
      breadcrumbs.push({
        link: obj.url,
        title: formatedTitle(obj.name),
      });
    }
  });

  if (breadcrumbs.length === 1) {
    breadcrumbs.push({
      link: location,
      title: paths,
    });
  }

  return (
    <nav>
      <ul className={styles.Container}>
        {breadcrumbs.map((crumb, index) => (
          <li key={`${crumb}-${index}`} className={styles.InnerContainer}>
            {createCrumb(crumb, index, slug)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
