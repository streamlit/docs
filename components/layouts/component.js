import HeaderLink from "../utilities/headerLink";

import styles from "./component.module.css";

const Component = ({ children, label }) => {
  return (
    <article className={styles.Container}>
      <section className={styles.Label}>
        <HeaderLink>
          <h1 className={styles.Title}>{label}</h1>
        </HeaderLink>
      </section>
      <section className={styles.Component}>{children}</section>
    </article>
  );
};

export default Component;
