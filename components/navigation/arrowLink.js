import Link from "next/link";

const ArrowLink = ({ children, link, type, content }) => {
  function ArrowType() {
    if (type == "back") {
      return (
        <Link href={link}>
          <a
            className={`
              not-link arrow_link block-arrow-link
              border-none
              text-base tracking-tight
              font-sans font-regular
              text-gray-90 dark:text-white
              leading-7
              hover:opacity-70
              flex items-center
              group transition-all
              ${type}
            `}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="text-gray-90 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 relative group-hover:scale-105 group-hover:-left-1"
            >
              <path
                d="M7.22017 13.7159L8.70312 12.2393L4.81037 8.35298H13.9318V6.19247H4.81037L8.70312 2.29972L7.22017 0.829545L0.776989 7.27273L7.22017 13.7159Z"
                fill="text-gray-90 dark:text-white"
              />
            </svg>
            <span className="mr-1 font-bold">Previous: </span>
            {content}
          </a>
        </Link>
      );
    } else if (type == "next") {
      return (
        <Link href={link}>
          <a
            className={`
              not-link arrow_link block-arrow-link
              border-none
              text-base tracking-tight
              font-sans font-regular
              text-gray-90 dark:text-white
              ml-0 md:ml-auto
              mt-8 md:mt-0
              leading-7
              hover:opacity-70
              flex items-center
              group transition-all
              ${type}
            `}
          >
            <span className="mr-1 font-bold">Next: </span>
            {content}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="text-gray-90 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 relative group-hover:scale-105 group-hover:-right-1"
            >
              <path
                d="M6.96165 13.7159L13.4048 7.27273L6.96165 0.829545L5.47869 2.30611L9.37145 6.19247H0.25V8.35298H9.37145L5.47869 12.2457L6.96165 13.7159Z"
                fill="text-gray-90 dark:text-white"
              />
            </svg>
          </a>
        </Link>
      );
    }
  }
  return <ArrowType />;
};

export default ArrowLink;
