import Link from "next/link";

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
      <a
        className={`
          not-link 
          ${styles.Container}
          ${tileSize}
        `}
      >
        {children}
      </a>
    </Link>
  );
};

export default RefCard;
