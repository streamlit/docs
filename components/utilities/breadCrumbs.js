import React from "react";
import { breadcrumbsForSlug } from "../../lib/utils.js";
import Link from "next/link";

import breadCrumbStyling from "./breadCrumbs.module.css";

const BreadCrumbs = ({ slug, menu }) => {
  const formatedTitle = (title) => {
    return `${title}`.replace(/\-/g, " ").replace(/\bapi\b/, "API");
  };

  const createCrumb = (crumb, index, slug) => {
    let formatedCrumb;
    if (index == slug.length) {
      formatedCrumb = (
        <Link href={crumb.link}>
          <a className="not-link bold">{crumb.title}</a>
        </Link>
      );
    } else {
      formatedCrumb = (
        <>
          <Link href={crumb.link}>
            <a className="not-link">{crumb.title}</a>
          </Link>
          <span>/</span>
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
    <nav className={breadCrumbStyling.Container}>
      {breadcrumbs.map((crumb, index) => (
        <li key={`${crumb}-${index}`} className="small">
          {createCrumb(crumb, index, slug)}
        </li>
      ))}
    </nav>
  );
};

export default BreadCrumbs;
