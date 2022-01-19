import React from "react";
import { breadcrumbsForSlug } from "../../lib/utils.js";
import Link from "next/link";

import styles from "./breadCrumbs.module.css";

const BreadCrumbs = ({ slug, menu }) => {
  const formatedTitle = (title) => {
    return `${title}`.replace(/\-/g, " ").replace(/\bapi\b/, "API");
  };

  const createCrumb = (crumb, index, slug) => {
    let formatedCrumb;
    if (index == slug.length) {
      formatedCrumb = (
        <Link href={crumb.link}>
          <a className={`not-link ${styles.ActiveLink} ${styles.Link}`}>
            {crumb.title}
          </a>
        </Link>
      );
    } else {
      formatedCrumb = (
        <>
          <Link href={crumb.link}>
            <a className={`not-link ${styles.Link}`}>{crumb.title}</a>
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

  const isnum = /^[\d\.]+$/.test(slug[0]);
  if (isnum) {
    paths = slug.slice(1).join("/");
    breadcrumbs.push({
      link: "#",
      title: slug[0],
    });
  }

  // Find the menu with the current slug
  const location = `/${paths}`;
  const path = breadcrumbsForSlug(menu, location, []);

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
      <ul className="flex list-none ml-0">
        {breadcrumbs.map((crumb, index) => (
          <li key={`${crumb}-${index}`} className="text-sm mr-2">
            {createCrumb(crumb, index, slug)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
