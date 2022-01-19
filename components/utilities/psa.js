import styles from "./psa.module.css";

const Psa = () => {
  return (
    <section className={styles.Container}>
      <i className={styles.Icon}>forum</i>
      <article>
        <h3 className={styles.Title}>Still have questions?</h3>
        <p className={styles.Text}>
          Our{" "}
          <a
            href="https://discuss.streamlit.io"
            target="_blank"
            className={styles.Link}
          >
            forums
          </a>{" "}
          are full of helpful information and Streamlit experts.
        </p>
      </article>
    </section>
  );
};

export default Psa;
