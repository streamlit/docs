// Simple horizontal flex container used for MDX.
const Download = ({ href, children }) => {
  return (
    <a
      href={href}
      className="
        font-sans text-base tracking-tight
        border-b border-b-gray-90 dark:border-b-white dark:hover:border-b-red-70 hover:border-b-red-70
        text-gray-90 dark:text-white
        hover:opacity-70
      "
      rel="nofollow noopener"
      download
    >
      {children}
    </a>
  );
};

export default Download;
