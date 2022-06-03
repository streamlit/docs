import React from "react";
import classNames from "classnames";

import styles from "./cloud.module.css";

const Cloud = ({ src, height }) => {
  let CloudBlock;

  if (height) {
    CloudBlock = (
      <section className={styles.Container}>
        <iframe
          loading="lazy"
          src={`${src}`}
          height={height}
          className={styles.Iframe}
        />
        <a href={src} target="_blank" className={styles.Caption}>
          (view standalone Streamlit app)
        </a>
      </section>
    );
  } else {
    CloudBlock = (
      <section className={styles.Container}>
        <iframe
          loading="lazy"
          src={`${src}`}
          className={classNames(styles.Iframe, styles.VideoAspectRatio)}
        />
        <a href={src} target="_blank" className={styles.Caption}>
          (view standalone Streamlit app)
        </a>
      </section>
    );
  }
  return CloudBlock;
};

export default Cloud;
