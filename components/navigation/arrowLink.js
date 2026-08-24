import Link from "next/link";

import IconLink from "../blocks/iconLink";

import styles from "./arrowLink.module.css";

const ArrowLink = ({ link, type, content, target }) => {
  const href = link || "#";

  if (type == "back") {
    return (
      <IconLink href={href} icon="arrow_back" target={target}>
        <span className={styles.Text}>Previous: </span>
        {content}
      </IconLink>
    );
  } else if (type == "next") {
    return (
      <IconLink
        href={href}
        icon="arrow_forward"
        target={target}
        iconClassName={styles.NextIcon}
      >
        <span className={styles.Text}>Next: </span>
        {content}
      </IconLink>
    );
  }
};

export default ArrowLink;
