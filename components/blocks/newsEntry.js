import ArrowLink from "../navigation/arrowLink";

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
    <article className="block-news-entry">
      <time className="tiny" dateTime="date">
        {niceDate(date)}
      </time>
      <h4>{title}</h4>
      <p className="small">{text}</p>
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
