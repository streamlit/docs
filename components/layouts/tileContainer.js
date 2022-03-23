import styles from "./tileContainer.module.css";

const TilesContainer = ({ children }) => {
  return <section className={styles.Container}>{children}</section>;
};

export default TilesContainer;
