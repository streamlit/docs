import React from "react";
import classNames from "classnames";

import IconHeader from "./iconHeader";

import CalloutStyles from "./callout.module.css";
import WarningStyles from "./important.module.css";

const Warning = ({ children }) => {
  return (
    <section
      className={classNames(CalloutStyles.Container, WarningStyles.Important)}
    >
      <IconHeader
        icon="priority_high"
        rotate="0"
        title="Warning"
        background="orange-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Warning;
