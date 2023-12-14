import Link from "next/link";

import styles from "./button.module.css";

const Button = ({ children, link, target }) => {
  return target == "_blank" ? (
    <a
      href={link}
      target={target}
      rel="noopener noreferrer"
      className={styles.Button}
    >
      {children}
    </a>
  ) : (
    <Link href={link} className={styles.Button}>
      {children}
    </Link>
  );
};

export default Button;
