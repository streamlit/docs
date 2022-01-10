import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";

import floatingNavStyles from "./floatingNav.module.css";

const useHeadingsData = (slug) => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        "article.leaf-page h1, article.leaf-page h2, article.leaf-page h3, article.leaf-page h4, article.leaf-page h5, article.leaf-page h6"
      )
    );

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, [slug]);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  for (const index in headingElements) {
    const ele = headingElements[index];
    if (ele.getElementsByTagName === undefined) {
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
        absolute right-0 top-0
        h-full w-56
        z-10
        hidden
        ${
          // The way the current CSS works, we need to have a .toc class, not only to style the floating nav component, but also to ensure the .content area gets narrowed by ~225px so the floating nav fits the screen.
          // TODO: When all components are refactored, we might want to use a different layout method (flexbox or grid) to avoid this
          `toc`
        }
      `}
    >
      <div
        className="
          absolute
          h-6 w-full
          bg-gradient-to-b from-white
          z-10
        "
      />
      <ol
        className={`
          sticky top-24
          m-0
          list-none
          overflow-y-auto overflow-x-hidden
          ${floatingNavStyles.List}
        `}
      >
        <li
          className="
            m-0
            pt-6 pl-6
            text-xs uppercase font-semibold tracking-loose
          "
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
  return (
    <>
      {headings.map((heading, index) => (
        <Heading heading={heading} index={index} activeId={activeId} />
      ))}
    </>
  );
};

const Heading = ({ heading, index, activeId }) => {
  const active =
    heading.target === activeId
      ? `${floatingNavStyles.activeItem} dark:text-white`
      : "";

  return (
    <li
      className={`
        m-0
        text-xs
        pt-2
        ${
          heading.level === "H1" || heading.level === "H2"
            ? "pl-6"
            : heading.level === "H3"
            ? "pl-8"
            : heading.level === "H4"
            ? "pl-10"
            : heading.level === "H5"
            ? "pl-12"
            : "pl-14"
        }
      `}
      key={`toc-${index}`}
    >
      <a
        href={heading.target}
        className={`
          border-b-0
          inline-block truncate w-40
          leading-4
          hover:opacity-70 hover:border-b-0 hover:no-underline
          ${active}
        `}
      >
        {heading.label}
      </a>
    </li>
  );
};

export default withRouter(FloatingNav);
