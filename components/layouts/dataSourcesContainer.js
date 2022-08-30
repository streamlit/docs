import styles from "./dataSourcesContainer.module.css";

const DataSourcesContainer = ({ children }) => {
  return <section className={styles.Container}>{children}</section>;
};

export default DataSourcesContainer;
