import React, { useState } from "react";
import classNames from "classnames";

import styles from "./image.module.css";

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
    customCaption = <p className={styles.Caption}>{caption}</p>;
  }
  if (pure) {
    block = <img src={src} alt={alt} />;
  } else if (isOpen) {
    block = (
      <section className={styles.Container}>
        <section className={styles.InnerContainer}>
          <img
            onClick={openModal}
            src={src}
            alt={alt}
            className={classNames(captionClass, styles.Image)}
          />
          {customCaption}
        </section>
        <section className={styles.LightBox} onClick={closeModal}>
          <button className={styles.CloseButton} onClick={openModal}>
            close
          </button>
          <section className={styles.ImageContainer}>
            <img
              src={src}
              alt={alt}
              className={classNames(captionClass, styles.ModalImage)}
            />
            {customCaption}
          </section>
        </section>
      </section>
    );
  } else if (clean) {
    block = (
      <section>
        <img onClick={openModal} src={src} alt={alt} className={captionClass} />
        {customCaption}
      </section>
    );
  } else {
    block = (
      <section className={styles.Container}>
        <section className={styles.InnerContainer}>
          <img
            onClick={openModal}
            className={classNames(captionClass, styles.Image)}
            src={src}
            alt={alt}
          />
          {customCaption}
        </section>
      </section>
    );
  }

  return block;
};

export default Image;
