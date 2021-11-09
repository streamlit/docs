import ArrowLink from "../navigation/arrowLink";

export default function NewsEntry({ children, date, title, text, link }) {
  function niceDate(date) {
    let cleanDate = new Date(date);
    // let date = new Date(this.date);
    return cleanDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
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
}
