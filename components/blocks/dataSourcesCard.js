import Link from "next/link";
import classNames from "classnames";

import styles from "./dataSourcesCard.module.css";

const DataSourcesCard = ({ children, size, href }) => {
  const tileSize =
    size === "full"
      ? styles.Full
      : size === "half"
        ? styles.Half
        : size === "third"
          ? styles.Third
          : size === "two-third"
            ? styles.TwoThirds
            : styles.Fourth;

  return (
    <Link href={href} className={classNames(styles.Container, tileSize)}>
      {children}
    </Link>
  );
};

export default DataSourcesCard;
