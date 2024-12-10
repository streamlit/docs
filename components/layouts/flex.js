import styles from "./flex.module.css";
import classNames from "classnames";

// Simple horizontal flex container used for MDX.
const Flex = ({ wrap = false, children }) => {
  return (
    <section
      className={classNames(styles.Container, wrap ? styles.wrapContainer : "")}
    >
      {children}
    </section>
  );
};

export default Flex;
