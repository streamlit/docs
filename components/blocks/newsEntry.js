import ArrowLink from "../navigation/arrowLink";
import classNames from "classnames";

import styles from "./newsEntry.module.css";
import Image from "./image";

function convertToUTC(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString();
}

const NewsEntry = ({ date, title, text, link, image, target }) => {
  const niceDate = (dateStr) => {
    const utcDateStr = convertToUTC(dateStr);
    if (utcDateStr !== null) {
      const date = new Date(utcDateStr);
    }

    if (isNaN(date.getTime())) {
      // dateStr is not a valid date
      return "No date";
    }

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article
      className={classNames(styles.Container, image && styles.flexContainer)}
    >
      {image && <Image src={image} clean={true} />}
      <div className={styles.TextContainer}>
        <time className={styles.Date} dateTime="date">
          {niceDate(date)}
        </time>
        <h4 className={styles.Title}>{title}</h4>
        <p className={styles.Text}>{text}</p>
        <ArrowLink
          link={link ? link : "#"}
          type="next"
          clean={true}
          className="tiny bold"
          content="Read More"
          target={target ? target : ArrowLink.target}
        />
      </div>
    </article>
  );
};

export default NewsEntry;
