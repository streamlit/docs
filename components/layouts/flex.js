import styles from "./flex.module.css";

// Simple horizontal flex container used for MDX.
const Flex = ({ children }) => {
  return <section className={styles.Container}>{children}</section>;
};

export default Flex;
