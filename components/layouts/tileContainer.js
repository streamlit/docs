import styles from "./tileContainer.module.css";

const TilesContainer = ({ layout, children }) => {
  const classes =
    layout == "list" ? styles.ListContainer : styles.GridContainer;

  return <section className={classes}>{children}</section>;
};

export default TilesContainer;
