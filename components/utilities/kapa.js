import styles from "./kapa.module.css";

const Kapa = () => {
  const showTooltip = () => {
    let tips = document.getElementsByClassName(styles.Tooltip);
    if (tips.length > 0) {
      tips[0].style.display = "block";
    }
  };

  const hideTooltip = () => {
    let tips = document.getElementsByClassName(styles.Tooltip);
    if (tips.length > 0) {
      tips[0].style.display = "none";
    }
  };
  let kapaWidget = (
    <div className={styles.FooterContainer}>
      <section className={styles.AskButtonContainer}>
        <button
          id="kapa-ai"
          type="button"
          className={styles.AskButton}
          onMouseOver={showTooltip}
          onMouseOut={hideTooltip}
        >
          <i className={styles.AskIcon}>forum</i> Ask AI
        </button>
        {/* <div className={styles.Tooltip}>
          <p>Try our new docs assistant!</p>
        </div> */}
        <script
          src="https://widget.kapa.ai/kapa-widget.bundle.js"
          data-website-id="e81c2b35-6c03-4576-a56c-3c825f866e06"
          data-project-name="Streamlit"
          data-project-color="#000000"
          data-project-logo="https://docs.streamlit.io/logo.svg"
          data-modal-title="Streamlit docs assistant (beta)"
          data-modal-disclaimer="
                This AI chatbot is powered by kapa.ai and public Streamlit information.
                Answers may be inaccurate, inefficient, or biased. Any use or decisions
                based on such answers should include reasonable practices including
                human oversight to ensure they are safe, accurate, and suitable for
                your intended purpose. Streamlit is not liable for any actions, losses,
                or damages resulting from the use of the chatbot.

                You are hereby notified that this chat may be recorded, monitored,
                and stored to improve our services. Do not enter any private,
                sensitive, personal, or regulated data. By using this chatbot, you
                consent to such monitoring and recording.  You further acknowledge
                and agree that input you provide and answers you receive (collectively,
                “Content”) may be used by Streamlit and kapa.ai to provide, maintain,
                develop, and improve their respective offerings. For more information on how
                kapa.ai may use your Content, see https://www.kapa.ai/content/terms-of-service."
          data-button-hide="true"
          data-modal-override-open-id="kapa-ai"
          data-modal-lock-scroll="false"
          data-modal-border-radius="6px"
          data-modal-image-height="18px"
          data-answer-feedback-button-active-border="1px solid #808495"
          data-user-analytics-cookie-enabled="false"
        ></script>
      </section>
    </div>
  );

  return kapaWidget;
};

export default Kapa;
