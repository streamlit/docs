import React from "react";

// Utility function to check if children contain an anchor tag
export const containsAnchor = (children) => {
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
