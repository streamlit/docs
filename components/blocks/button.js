import Link from "next/link";

const IconHeader = ({ children, link }) => {
  return (
    <Link href={link}>
      <button>{children}</button>
    </Link>
  );
};

export default IconHeader;
