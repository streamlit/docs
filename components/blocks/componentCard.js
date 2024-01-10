import classNames from "classnames";
import React from "react";

import genericStyles from "./refCard.module.css";
import customStyles from "./componentCard.module.css";
import { containsAnchor } from "../../scripts/contains-anchor";

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
