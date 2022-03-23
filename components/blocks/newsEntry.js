import ArrowLink from "../navigation/arrowLink";

import styles from "./newsEntry.module.css";

const NewsEntry = ({ date, title, text, link }) => {
  const niceDate = (date) => {
    let cleanDate = new Date(date);
    return cleanDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
};

export default NewsEntry;
