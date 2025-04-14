import React, { useState, useCallback, useEffect } from "react";
import styles from "./assistant.module.css";

import Modal from "./Modal";

const Assistant = () => {
  const [assistantVisible, setAssistantVisible] = useState(false);

  const showAssistant = useCallback(() => {
    setAssistantVisible(true);
  }, []);

  const hideAssistant = useCallback(() => {
    setAssistantVisible(false);
  }, []);

  return (
    <>
      <div className={styles.AskButtonContainer}>
        <button className={styles.AskButton} onClick={showAssistant}>
          <i className={styles.AskIcon}>forum</i> Ask AI
        </button>
      </div>

      {assistantVisible && (
        <Modal
          closeDialog={hideAssistant}
          contentClassName={styles.IframeWrapper}
        >
          <iframe
            className={styles.Iframe}
            src="https://st-assistant.streamlit.app/~/+/?embed=true"
          ></iframe>
        </Modal>
      )}
    </>
  );
};

export default Assistant;
