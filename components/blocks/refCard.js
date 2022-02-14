import Link from "next/link";
import classNames from "classnames";

import styles from "./refCard.module.css";

const RefCard = ({ children, size, href }) => {
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
    <Link href={href}>
      <a className={classNames(styles.Container, tileSize)}>{children}</a>
    </Link>
  );
};

export default RefCard;
