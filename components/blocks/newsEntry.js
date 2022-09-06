import ArrowLink from "../navigation/arrowLink";

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

  if (image) {
    return (
      <article className={styles.Container}>
        <Image src={image} clean={true} />
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
        ></ArrowLink>
      </article>
    );
  } else {
    return (
      <article className={styles.Container}>
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
        ></ArrowLink>
      </article>
    );
  }
};

export default NewsEntry;
