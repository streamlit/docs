import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";

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
    <div className={`toc`}>
      <div className="top-gradient" />
      <ol className="toc-level">
        <li className="toc-title">Contents</li>
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
  const active = heading.target === activeId ? "active" : "";

  return (
    <li className={`level-${heading.level} ${active}`} key={`toc-${index}`}>
      <a href={heading.target}>{heading.label}</a>
    </li>
  );
};

export default withRouter(FloatingNav);
