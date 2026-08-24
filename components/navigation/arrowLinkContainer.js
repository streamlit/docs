import styles from "./arrowLinkContainer.module.css";

const ArrowLinkContainer = ({ children }) => {
  return <section className={styles.Container}>{children}</section>;
};

export default ArrowLinkContainer;
