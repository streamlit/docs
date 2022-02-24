import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./tile.module.css";

const Tile = ({
  img,
  dark,
  icon,
  background,
  color,
  rotate,
  size,
  link,
  title,
  text,
  borderColor,
}) => {
  const [theme, setTheme] = useState("light-mode");

  const tileSize =
    size === "full"
      ? styles.Full
      : size === "half"
      ? styles.Half
      : size === "third"
      ? styles.Third
      : size === "two-third"
      ? styles.TwoThirds
      : styles.Third;

  useEffect(() => {
    window.addEventListener("ChangeTheme", handleTheme);

    return () => {
      window.removeEventListener("ChangeTheme", handleTheme);
    };
  }, []);

  const handleTheme = () => {
    setTheme(document.body.dataset.theme);
  };

  let image;
  if (img) {
    image = <img src={img} className={styles.Icon} />;
  } else {
    image = (
      <i className={classNames("material-icons-sharp", styles.Icon)}>
        {icon || "downloading"}
      </i>
    );
  }

  const backgroundColor =
    background === "orange-70"
      ? styles.OrangeBackground
      : background === "violet-70"
      ? styles.VioletBackground
      : background === "unset"
      ? styles.TransparentBackground
      : styles.BlueBackground;

  return (
    <div
      className={classNames(
        styles.Container,
        tileSize || "third",
        backgroundColor
      )}
    >
      <Link href={link || "/"}>
        <a className={classNames("not-link", styles.Link)}>
          {image}
          <div>
            <h4 className={styles.Title}>{title || "Install Streamlit"}</h4>
            <p className={styles.Text}>
              {text ||
                "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Tile;
