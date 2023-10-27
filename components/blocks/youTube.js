import React from "react";

import styles from "./youtube.module.css";

const YouTube = ({ caption, videoId, start, end, autoplay, loop }) => {
  let YouTubeBlock;
  let mute = 0;

  if (autoplay || loop) {
    mute = 1;
  }

  YouTubeBlock = (
    <section className={styles.Container}>
      <div className={styles.IframeContainer}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?playlist=${videoId}&rel=0&start=${start}&end=${end}&autoplay=${autoplay}&loop=${loop}&mute=${mute}`}
          className={styles.Iframe}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {caption && (
        <div className={styles.CaptionContainer}>
          <p className={styles.Caption}>{caption}</p>
        </div>
      )}
    </section>
  );
  return YouTubeBlock;
};

export default YouTube;
