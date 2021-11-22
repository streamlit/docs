import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        "article.leaf-page h1, article.leaf-page h2, article.leaf-page h3, article.leaf-page h4, article.leaf-page h5, article.leaf-page h6"
      )
    );

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

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
const useIntersectionObserver = (setActiveId) => {
  // Since we want to keep track of the visibility of all the heading elements, we'll store these values in a useRef hook
  const headingElementsRef = useRef({});

  useEffect(() => {
    // This is our callback function. The observer will call this function each time elements scroll in or out of view.
    // When we first render the page, it calls the callback with a list of all the elements we want to keep track on the page. As elements scroll in and out of view, it will call the callback with these elements to update the visibility.
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        const link = headingElement.target.getElementsByTagName("a");
        if (link.length > 0) {
          const target = link[0].getAttribute("href");
          map[target] = headingElement;
        }
        return map;
      }, headingElementsRef.current);

      // Each heading element in our headings list has a isIntersecting (or “is visible”) value. It’s possible to have more than one visible heading on the page, so we’ll need to create a list of all visible headings.
      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      // This function allow us determine the position of a heading given its ID, and set it as active or not
      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      // This function finds the visible/s heading/s that is/are closer to the top of the page
      // When we find it/them, we set it/them on state
      if (visibleHeadings.length === 1) {
        const link = visibleHeadings[0].target.getElementsByTagName("a");
        setActiveId(link[0].getAttribute("href"));
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) => {
          const aLink = a.target.getElementsByTagName("a");
          const bLink = b.target.getElementsByTagName("a");

          return (
            getIndexFromId(aLink[0].getAttribute("href")) >
            getIndexFromId(bLink[0].getAttribute("href"))
          );
        });
        const link = sortedVisibleHeadings[0].target.getElementsByTagName("a");
        setActiveId(link[0].getAttribute("href"));
      }
    };

    // Create the intersection observer
    const observer = new IntersectionObserver(callback, {
      threshold: 1.0,
      rootMargin: "0px 0px -200px 0px",
    });

    // After creating the observer, we need to call observe() on each of the elements we want to observe. In our case, all the headings on the article page
    const headingElements = Array.from(
      document.querySelectorAll(
        "article.leaf-page h1, article.leaf-page h2, article.leaf-page h3, article.leaf-page h4, article.leaf-page h5, article.leaf-page h6"
      )
    );
    headingElements.forEach((element) => observer.observe(element));

    // Disconnecting the Intersection Observer when unmounting
    return () => observer.disconnect();
  }, []);
};

const FloatingNav = ({ menu, slug }) => {
  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

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
  let svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
    >
      <path
        d="M0.952437 7.90752L1.14007 8.07272L0.952436 7.90752C0.682521 8.21409 0.682521 8.69954 0.952436 9.00611C1.23875 9.3313 1.71774 9.3313 2.00405 9.00611L5.04756 5.54929C5.31748 5.24273 5.31748 4.75727 5.04756 4.45071L2.00405 0.993892C1.71774 0.668703 1.23875 0.668703 0.952437 0.993892C0.682521 1.30046 0.682521 1.78591 0.952437 2.09248L3.51233 5L0.952437 7.90752Z"
        fill="none"
        stroke="none"
        strokeWidth="0.5"
      ></path>
    </svg>
  );

  return headings.map((heading, index) => {
    const active = heading.target === activeId ? "active" : "";
    return (
      <li className={`level-${heading.level} ${active}`} key={`toc-${index}`}>
        {svg}
        <a href={heading.target}>{heading.label}</a>
      </li>
    );
  });
};

export default withRouter(FloatingNav);
