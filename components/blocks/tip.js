import React from "react";
import classNames from "classnames";

import IconHeader from "../blocks/iconHeader";

import CalloutStyles from "./callout.module.css";
import TipStyles from "./tip.module.css";

const Tip = ({ children }) => {
  return (
    <section className={classNames(CalloutStyles.Container, TipStyles.Tip)}>
      <IconHeader
        icon="star"
        rotate="0"
        title="Tip"
        background="indigo-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Tip;
