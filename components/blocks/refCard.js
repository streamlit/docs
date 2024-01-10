import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

import styles from "./refCard.module.css";

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

const RefCard = ({ children, size, href, deprecated }) => {
  const router = useRouter();
  const containsAnchorTag = containsAnchor(children);

  const tileSize =
    size === "full"
      ? styles.Full
      : size === "half"
        ? styles.Half
        : size === "third"
          ? styles.Third
          : size === "two-third"
            ? styles.TwoThirds
            : styles.Third;

  const handleCardClick = (e) => {
    if (e.target.tagName !== "A") {
      router.push(href);
    }
  };

  const Wrapper = containsAnchorTag ? "div" : Link;
  const wrapperProps = containsAnchorTag
    ? {
        onClick: handleCardClick,
        className: classNames(styles.Container, tileSize),
      }
    : { href, className: classNames(styles.Container, tileSize) };

  const deprecatedContent =
    deprecated === true ? (
      <div className={classNames("group", styles.DeprecationNotice)}>
        <span
          className={classNames(
            "h-3 w-3 p-0 transform rotate-45 absolute right-[13px] -top-2 bg-orange-10 transition ease-in-out duration-100 opacity-0 group-hover:opacity-100",
            styles.DeprecatedArrow,
          )}
        />
        <i
          className={classNames("material-icons-sharp", styles.DeprecatedIcon)}
        >
          {"delete"}
        </i>
      </div>
    ) : null;

  return (
    <Wrapper {...wrapperProps}>
      {deprecatedContent}
      {children}
    </Wrapper>
  );
};

export default RefCard;
