import Link from "next/link";

import styles from "./arrowLink.module.css";

const ArrowLink = ({ children, link, type, content, target }) => {
  function ArrowType() {
    const href = link || "#";
    if (type == "back") {
      return (
        <Link href={href}>
          <a
            className={`
              not-link
              group
              ${styles.Link}
              ${styles.BackLink}
            `}
            target={target == "_blank" ? target : "_self"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
              className={`
                ${styles.Icon}
                ${styles.BackIcon}
              `}
            >
              <path d="M7.22017 13.7159L8.70312 12.2393L4.81037 8.35298H13.9318V6.19247H4.81037L8.70312 2.29972L7.22017 0.829545L0.776989 7.27273L7.22017 13.7159Z" />
            </svg>
            <span className={styles.Text}>Previous: </span>
            <span className={styles.Truncate}>{content}</span>
          </a>
        </Link>
      );
    } else if (type == "next") {
      return (
        <Link href={href}>
          <a
            className={`
              not-link
              group
              ${styles.Link}
              ${styles.NextLink}
            `}
            target={target == "_blank" ? target : "_self"}
          >
            <span className={styles.Text}>Next: </span>
            <span className={styles.Truncate}>{content}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="text-gray-90 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              className={`
                ${styles.Icon}
                ${styles.NextIcon}
              `}
            >
              <path d="M6.96165 13.7159L13.4048 7.27273L6.96165 0.829545L5.47869 2.30611L9.37145 6.19247H0.25V8.35298H9.37145L5.47869 12.2457L6.96165 13.7159Z" />
            </svg>
          </a>
        </Link>
      );
    }
  }
  return <ArrowType />;
};

export default ArrowLink;
