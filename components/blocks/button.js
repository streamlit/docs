import Link from "next/link";

import styles from "./button.module.css";

const Button = ({ children, link, target }) => {
  if (target == "_blank") {
    return (
      <a
        href={link}
        target={target}
        rel="noopener noreferrer"
        className={styles.Button}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link href={link}>
        <a className={styles.Button}>{children}</a>
      </Link>
    );
  }
};

export default Button;
