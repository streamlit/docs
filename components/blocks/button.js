import Link from "next/link";

import styles from "./button.module.css";

const Button = ({ children, link, target }) => {
  if (target == "_blank") {
    return (
      <a href={link} target={target}>
        <button className={styles.Button}>{children}</button>
      </a>
    );
  } else {
    return (
      <Link href={link}>
        <button className={styles.Button}>{children}</button>
      </Link>
    );
  }
};

export default Button;
