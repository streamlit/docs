import React from "react";
import classNames from "classnames";

import IconHeader from "../blocks/iconHeader";

import CalloutStyles from "./callout.module.css";
import ImportantStyles from "./important.module.css";

const Important = ({ children }) => {
  return (
    <section
      className={classNames(CalloutStyles.Container, ImportantStyles.Important)}
    >
      <IconHeader
        icon="priority_high"
        rotate="0"
        title="Important"
        background="orange-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Important;
