import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";

import styles from "./floatingNav.module.css";

const useHeadingsData = (slug) => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        "article.leaf-page h1, article.leaf-page h2, article.leaf-page h3, article.leaf-page h4, article.leaf-page h5, article.leaf-page h6"
      )
    );

    // Remove the first heading here, since we don't want to show the main title on the TOC
    headingElements.shift();

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, [slug]);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  for (const index in headingElements) {
    const ele = headingElements[index];

    // Check if the heading belongs to a component. If so, let's skip it to avoid cluttering the side nav
    const parentElem = ele.parentElement;
    const isParentExternal =
      (parentElem.href && parentElem.href.includes("github")) ||
      (parentElem.href && parentElem.href.includes("streamlit.app"));

    if (ele.getElementsByTagName === undefined || isParentExternal === true) {
      continue;
    }
    const hrefs = ele.getElementsByTagName("a");
    if (hrefs.length > 0) {
      const target = hrefs[0].getAttribute("href");
      nestedHeadings.push({
        label: ele.innerText,
        target: target,
        level: ele.tagName,
      });
    }
  }

  return nestedHeadings;
};

// This is the function that initializes the intersection observer, and attaches it to the elements we want to track, our page headings
const useIntersectionObserver = (slug) => {
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    // Get all links inside the headers we care about.
    const headingLinks = Array.from(
      document.querySelectorAll(
        [
          "article.leaf-page h1 a:first-of-type",
          "article.leaf-page h2 a:first-of-type",
          "article.leaf-page h3 a:first-of-type",
          "article.leaf-page h4 a:first-of-type",
          "article.leaf-page h5 a:first-of-type",
          "article.leaf-page h6 a:first-of-type",
        ].join(",")
      )
    );

    // Function that will be called when the links enter/leave the screen.
    const callback = (headings) => {
      // Traverse backwards through all elements to find the bottom-most visible element.
      // Set that as the active one.
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].isIntersecting) {
          setActiveId(headings[i].target.getAttribute("href"));
          break;
        }
      }
    };

    // Create an intersection observer, to track when the links enter/leave.
    const observer = new IntersectionObserver(callback, {
      threshold: 1.0,
      rootMargin: "0px 0px -200px 0px",
    });

    headingLinks.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [slug]);

  return activeId;
};

const FloatingNav = ({ menu, slug }) => {
  const { nestedHeadings } = useHeadingsData(slug);
  const activeId = useIntersectionObserver(slug);

  return nestedHeadings.length > 1 ? (
    <div
      className={`
        ${styles.ListContainer}
        ${
          // The way the current CSS works, we need to have a .toc class, not only to style the floating nav component, but also to ensure the .content area gets narrowed by ~225px so the floating nav fits the screen.
          // TODO: When all components are refactored, we might want to use a different layout method (flexbox or grid) to avoid this
          `toc`
        }
      `}
    >
      <div className={styles.TopGradient} />
      <ol
        className={`
          ${styles.List}
        `}
      >
        <li
          className={`
            ${styles.ListItem}
            ${styles.ListTitle}
          `}
        >
          Contents
        </li>
        <Headings headings={nestedHeadings} activeId={activeId} />
      </ol>
    </div>
  ) : (
    ""
  );
};

const Headings = ({ headings, activeId }) => {
  // Function to get the unique hierarchies for the headings.
  // For example, we could have [H1, H2, H3] but also [H1, H4],
  // and we want the indentation to acommodate for these situations.
  const uniqueHierarchies = [...new Set(headings.map((item) => item.level))];

  const sortedHeadings = uniqueHierarchies.map((hierarchy, index) =>
    headings.filter((heading) => {
      if (heading.level === hierarchy) {
        heading.hierarchy = index;
      }
      return heading;
    })
  );

  return (
    <>
      {sortedHeadings[0].map((heading, index) => (
        <Heading
          key={index}
          heading={heading}
          index={index}
          activeId={activeId}
        />
      ))}
    </>
  );
};

const Heading = ({ heading, index, activeId }) => {
  return (
    <li
      className={styles.ListItem}
      data-hierarchy={heading.hierarchy}
      key={`toc-${index}`}
    >
      <a
        href={heading.target}
        className={`
          ${styles.Link}
          ${heading.target === activeId ? styles.activeLink : ""}
        `}
      >
        {heading.label}
      </a>
    </li>
  );
};

export default withRouter(FloatingNav);
