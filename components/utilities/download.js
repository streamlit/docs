import styles from "./download.module.css";

// Simple horizontal flex container used for MDX.
const Download = ({ href, children }) => {
  return (
    <a href={href} className={styles.Link} rel="nofollow noopener" download>
      {children}
    </a>
  );
};

export default Download;
