import styles from "./newsContainer.module.css";

const NewsContainer = ({ children }) => {
  return <section className={styles.Container}>{children}</section>;
};

export default NewsContainer;
