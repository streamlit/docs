import React from "react";

import Button from "./button";
import Image from "./image";

import styles from "./noteSplit.module.css";

const NoteSplit = ({ background, title, copy, button }) => {
  return (
    <section className={styles.Container}>
      <div className={styles.ContentContainer}>
        <h2>{title}</h2>
        <p>{copy}</p>
        <Button link={button.link}>{button.text}</Button>
      </div>
      <Image src="/join.png" clean={true} />
    </section>
  );
};

export default NoteSplit;
