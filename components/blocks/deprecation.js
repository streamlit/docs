import React from "react";
import classNames from "classnames";

import IconHeader from "../blocks/iconHeader";

import CalloutStyles from "./callout.module.css";
import DeprecatedStyles from "./deprecation.module.css";

const Deprecation = ({ children }) => {
  return (
    <section
      className={classNames(
        CalloutStyles.Container,
        DeprecatedStyles.Deprecated
      )}
    >
      <IconHeader
        icon="delete"
        rotate="0"
        title="Deprecation notice"
        background="orange-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Deprecation;
