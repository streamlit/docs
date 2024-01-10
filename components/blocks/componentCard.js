import classNames from "classnames";
import React from "react";

import genericStyles from "./refCard.module.css";
import customStyles from "./componentCard.module.css";

// Utility function to check if children contain an anchor tag
const containsAnchor = (children) => {
  let containsAnchorTag = false;
  React.Children.forEach(children, (child) => {
    if (child?.type === "a") {
      containsAnchorTag = true;
    } else if (child?.props?.children) {
      containsAnchorTag =
        containsAnchorTag || containsAnchor(child.props.children);
    }
  });
  return containsAnchorTag;
};

const ComponentCard = ({ children, href }) => {
  const containsAnchorTag = containsAnchor(children);

  const handleCardClick = (e) => {
    if (e.target.tagName !== "A") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const Wrapper = containsAnchorTag ? "div" : "a";
  const wrapperProps = containsAnchorTag
    ? {
        onClick: handleCardClick,
        className: classNames(genericStyles.Container, customStyles.Container),
        role: "link",
        tabIndex: "0",
      }
    : {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: classNames(genericStyles.Container, customStyles.Container),
      };

  return <Wrapper {...wrapperProps}>{children}</Wrapper>;
};

export default ComponentCard;
