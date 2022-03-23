import Link from "next/link";

import styles from "./button.module.css";

const Button = ({ children, link }) => {
  return (
    <Link href={link}>
      <button className={styles.Button}>{children}</button>
    </Link>
  );
};

export default Button;
