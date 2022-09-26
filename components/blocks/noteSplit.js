import React from "react";

import Button from "./button";
import Image from "./image";

import styles from "./noteSplit.module.css";

const NoteSplit = ({ background, title, copy, button, image }) => {
  return (
    <section className={styles.Container}>
      <div className={styles.ContentContainer}>
        <h2>{title}</h2>
        <p>{copy}</p>
        <Button link={button.link} target={button.target}>
          {button.text}
        </Button>
      </div>
      <Image src={image} clean={true} />
    </section>
  );
};

export default NoteSplit;
