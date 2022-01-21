import Link from "next/link";

import styles from "./inlineCallout.module.css";

const InlineCallout = ({ children, icon, color, bold, href }) => {
  const backgroundColor =
    color === "violet-70"
      ? styles.LibraryBackground
      : color === "l-blue-70"
      ? styles.CloudBackground
      : styles.KBBackground;
  const textColor =
    color === "violet-70"
      ? styles.LibraryText
      : color === "l-blue-70"
      ? styles.CloudText
      : styles.KBText;
  return (
    <section className={styles.Container}>
      <Link href={href}>
        <a
          className={`
            ${styles.IconContainer}
            not-link 
            ${backgroundColor}
          `}
        >
          <i className={styles.Icon}>{icon}</i>
        </a>
      </Link>
      <article>
        <p className={styles.Text}>
          <Link href={href}>
            <a
              className={`
                not-link
                ${styles.Link}
                ${textColor}
              `}
            >
              {bold}
            </a>
          </Link>{" "}
          {children}
        </p>
      </article>
    </section>
  );
};

export default InlineCallout;
