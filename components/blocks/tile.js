import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./tile.module.css";
import { useRouter } from "next/router";

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

  const backgroundColor = BG_CLASS[background];
  const router = useRouter();

  return (
    <div
      className={classNames(
        styles.Container,
        tileSize || "third",
        backgroundColor,
      )}
    >
      <Link
        href={{ pathname: link || "/", query: router.query }}
        className={classNames("not-link", styles.Link)}
      >
        {image}
        <div>
          <h4 className={styles.Title}>{title || "Install Streamlit"}</h4>
          <p className={styles.Text}>
            {text ||
              "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}
          </p>
        </div>
      </Link>
    </div>
  );
};

const BG_CLASS = {
  "red-70": styles.RedBackground,
  "orange-70": styles.OrangeBackground,
  "yellow-70": styles.YellowBackground,
  "green-70": styles.GreenBackground,
  "acqua-70": styles.AcquaBackground,
  "lightBlue-70": styles.LightBlueBackground,
  "darkBlue-70": styles.DarkBlueBackground,
  "indigo-70": styles.IndigoBackground,
  "gray-70": styles.GrayBackground,
  unset: styles.TransparentBackground,
};

export default Tile;
