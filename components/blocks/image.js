import React, { useState } from "react";

import Note from "./note";

const Image = ({ caption, pure, src, alt, clean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  let block;
  let customCaption;
  let captionClass;

  if (caption) {
    captionClass = "has-caption";
    customCaption = <p className="italic small">{caption}</p>;
  }
  if (pure) {
    block = <img src={src} alt={alt} />;
  } else if (isOpen) {
    block = (
      <section className="block-image">
        <Note color="unset" background="unset">
          <section className="image">
            <img
              onClick={openModal}
              src={src}
              alt={alt}
              className={captionClass}
            />
            {customCaption}
          </section>
        </Note>
        <section className="light-box" onClick={closeModal}>
          <button onClick={openModal}>close</button>
          <section className="content">
            <img src={src} alt={alt} className={captionClass} />
            {customCaption}
          </section>
        </section>
      </section>
    );
  } else if (clean) {
    block = (
      <section className="block-image clean" style={{ marginBottom: 0 }}>
        <section className="image">
          <img src={src} alt={alt} className={captionClass} />
          {customCaption}
        </section>
      </section>
    );
  } else {
    block = (
      <section className="block-image">
        <Note color="unset" background="unset">
          <section className="image">
            <img
              onClick={openModal}
              className={captionClass}
              src={src}
              alt={alt}
            />
            {customCaption}
          </section>
        </Note>
      </section>
    );
  }

  return block;
};

export default Image;
