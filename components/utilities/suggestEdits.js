import styles from "./suggestEdits.module.css";

const SuggestEdits = ({ sourcefile }) => {
  return (
    <section>
      <section className={styles.Container}>
        <i className={styles.Icon}>edit</i>
        <a
          className={styles.Link}
          href={sourcefile}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this page on GitHub
        </a>
      </section>
    </section>
  );
};

export default SuggestEdits;
