import classNames from "classnames";

import styles from "./codeTile.module.css";

// Used in cheatsheet.
const CodeTile = ({ children, size, featured }) => {
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

  return (
    <section
      className={classNames(
        styles.Container,
        tileSize || "",
        featured && styles.Featured
      )}
    >
      {children}
    </section>
  );
};

export default CodeTile;
