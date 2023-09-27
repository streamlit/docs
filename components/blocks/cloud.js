import React, { useEffect, useRef } from "react";
import classNames from "classnames";

import styles from "./cloud.module.css";

const Cloud = ({ src, height }) => {
  const iframeRef = useRef();
  let CloudBlock;

  if (height) {
    CloudBlock = (
      <section className={styles.Container}>
        <iframe
          loading="lazy"
          src={`${src}`}
          height={height}
          className={styles.Iframe}
          allow="camera;clipboard-read;clipboard-write;"
          key={src}
        />
        {/* <a href={src} target="_blank" className={styles.Caption}>
          (view standalone Streamlit app)
        </a> */}
      </section>
    );
  } else {
    CloudBlock = (
      <section className={styles.Container}>
        <iframe
          loading="lazy"
          src={`${src}`}
          className={classNames(styles.Iframe, styles.VideoAspectRatio)}
          allow="camera;clipboard-read;clipboard-write;"
          key={src}
        />
        {/* <a href={src} target="_blank" className={styles.Caption}>
          (view standalone Streamlit app)
        </a> */}
      </section>
    );
  }
  return CloudBlock;
};

export default Cloud;
