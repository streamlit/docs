import styles from "./inlineCalloutContainer.module.css";

const InlineCalloutContainer = ({ children, spacing }) => {
  const spacingClass = spacing ? styles.SingletonContainer : styles.Container;

  return <section className={spacingClass}>{children}</section>;
};

export default InlineCalloutContainer;
