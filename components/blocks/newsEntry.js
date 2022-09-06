import ArrowLink from "../navigation/arrowLink";
import classNames from "classnames";

import styles from "./newsEntry.module.css";
import Image from "./image";

const NewsEntry = ({ date, title, text, link, image }) => {
  const niceDate = (date) => {
    let cleanDate = new Date(date);
    return cleanDate.toLocaleDateString("en-US", {
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
          link={link}
          type="next"
          clean={true}
          className="tiny bold"
          content="Read More"
        />
      </div>
    </article>
  );
};

export default NewsEntry;
