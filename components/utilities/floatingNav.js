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

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({});

  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        const link = headingElement.target.getElementsByTagName("a");
        if (link.length > 0) {
          const target = link[0].getAttribute("href");
          map[target] = headingElement;
        }
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);
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

    const observer = new IntersectionObserver(callback, {
      threshold: 1.0,
      rootMargin: "0px 0px -200px 0px",
    });

    const headingElements = Array.from(
      document.querySelectorAll(
        "article.leaf-page h1, article.leaf-page h2, article.leaf-page h3, article.leaf-page h4, article.leaf-page h5, article.leaf-page h6"
      )
    );
    headingElements.forEach((element) => observer.observe(element));
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
