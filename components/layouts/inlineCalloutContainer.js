import styles from "./inlineCalloutContainer.module.css";

const InlineCalloutContainer = ({ children }) => {
  return <section className={styles.Container}>{children}</section>;
};

export default InlineCalloutContainer;
