import classNames from "classnames";
import styles from "./kapa.module.css";

const Kapa = () => {
  let kapaWidget = (
    <section className={styles.AskButtonContainer}>
      <button
        id="kapa-ai"
        aria-label={`Try our new docs assistant!`}
        title={`Try our new docs assistant!`}
        type="button"
        className={styles.AskButton}
      >
        <i className={styles.AskIcon}>forum</i>
      </button>
      <script
        src="https://widget.kapa.ai/kapa-widget.bundle.js"
        data-website-id="e81c2b35-6c03-4576-a56c-3c825f866e06"
        data-project-name="Streamlit"
        data-project-color="#000000"
        data-project-logo="https://docs.streamlit.io/logo.svg"
        data-modal-title="Streamlit Docs assistant"
        data-modal-disclaimer="
              This AI chatbot is powered by kapa.ai and public Streamlit information.
              Answers may be inaccurate, inefficient, or biased. Any use or decisions
              based on such answers should include reasonable practices including
              human oversight to ensure they are safe, accurate, and suitable for
              your intended purpose. Streamlit is not liable for any actions, losses,
              or damages resulting from the use of the chatbot. 

              Do not enter any private, sensitive, personal, or regulated data.
              By using this chatbot, you acknowledge and agree that input you provide
              and answers you receive (collectively, “Content”) may be used by
              Streamlit and kapa.ai to provide, maintain, develop, and improve
              their respective offerings. For more information on how
              kapa.ai may use your Content, see https://www.kapa.ai/content/terms-of-service."
        data-button-hide="true"
        data-modal-override-open-id="kapa-ai"
        data-modal-lock-scroll="false"
        data-modal-border-radius="6px"
        data-modal-image-height="18px"
      ></script>
    </section>
  );

  return kapaWidget;
};

export default Kapa;
