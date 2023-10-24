import React from "react";

import styles from "./youtube.module.css";

const YouTube = ({ caption, videoId, start, end, loop }) => {
  let YouTubeBlock;
  let modifier;

  if (loop) {
    modifier = "&autoplay=1&loop=1";
  } else {
    modifier = "";
  }

  if (caption) {
    YouTubeBlock = (
      <section className={styles.Container}>
        <section className={styles.IframeContainer}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&start=${start}&end=${end}${modifier}`}
            className={styles.Iframe}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
        <section className={styles.CaptionContainer}>
          <p className={styles.Caption}>{caption}</p>
        </section>
      </section>
    );
  } else {
    YouTubeBlock = (
      <section className={styles.IframeContainer}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&start=${start}&end=${end}${modifier}`}
          className={styles.Iframe}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>
    );
  }
  return YouTubeBlock;
};

export default YouTube;
