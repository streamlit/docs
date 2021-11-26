import Link from "next/link";

const RefCard = ({ children, size, href }) => {
  return (
    <Link href={href}>
      <a className={`not-link reference-card ${size || "third"}`}>{children}</a>
    </Link>
  );
};

export default RefCard;
