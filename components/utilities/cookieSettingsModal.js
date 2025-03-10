import classNames from "classnames";

import content from "../../content/cookie-settings.md";

import styles from "./cookieSettingsModal.module.css";
import Modal from "./Modal";
import { useCallback } from "react";

export default function CookieSettingsModal({
  setIsTelemetryModalVisible,
  declineTelemetryAndCloseBanner,
  allowTelemetryAndCloseBanner,
}) {
  const closeDialog = useCallback(() => {
    setIsTelemetryModalVisible(false);
  }, []);

  return (
    <Modal
      title="Cookie settings"
      closeDialog={closeDialog}
      modalClassName={styles.Container}
    >
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
      <button
        className={classNames(
          "mt-4 md:mt-8",
          "py-2 px-3",
          "text-gray-90",
          "border-gray-90 border",
          "rounded",
          "hover:bg-gray-90",
          "hover:text-white",
          "active:bg-gray-90",
          "active:text-white",
        )}
        onClick={declineTelemetryAndCloseBanner}
      >
        Reject all
      </button>
      <button
        className={classNames(
          "mt-4 md:mt-8 ml-4",
          "py-2 px-3",
          "text-gray-90",
          "border-gray-90 border",
          "rounded",
          "hover:bg-gray-90",
          "hover:text-white",
          "active:bg-gray-90",
          "active:text-white",
        )}
        onClick={allowTelemetryAndCloseBanner}
      >
        Accept all
      </button>
    </Modal>
  );
}
