import React from "react";

const YouTube = ({ caption, videoId }) => {
  let YouTubeBlock;

  if (caption) {
    YouTubeBlock = (
      <section className="block-youtube">
        <section className="iFrame-parent">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
        <section className="caption" v-if="caption">
          <p className="small italic">{caption}</p>
        </section>
      </section>
    );
  } else {
    YouTubeBlock = (
      <section className="block-youtube">
        <section className="iFrame-parent">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
      </section>
    );
  }
  return YouTubeBlock;
};

export default YouTube;
