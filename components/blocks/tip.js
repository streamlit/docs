import React from "react";

import IconHeader from "../blocks/iconHeader";

import styles from "./tip.module.css";

const Tip = ({ children }) => {
  return (
    <section className={styles.Container}>
      <IconHeader
        icon="star"
        rotate="0"
        title="Tip"
        background="violet-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Tip;
