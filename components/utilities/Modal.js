import classNames from "classnames";

import styles from "./Modal.module.css";
import { useCallback } from "react";

export default function Modal({
  title,
  closeDialog,
  shimClassName,
  modalClassName,
  contentClassName,
  children,
}) {
  const dontHide = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <div
      className={classNames(styles.Shim, shimClassName)}
      onClick={closeDialog}
    >
      <dialog
        className={classNames(styles.Modal, modalClassName)}
        onClick={dontHide}
      >
        <header className={styles.Header}>
          <h3 className={styles.Title}>{title}</h3>

          <button className={styles.CloseButton} onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="mt-2 w-8 h-8 hover:bg-gray-30 rounded"
            >
              <path d="m253.897-229.795-24.102-24.102L455.897-480 229.795-706.103l24.102-24.102L480-504.103l226.103-226.102 24.102 24.102L504.103-480l226.102 226.103-24.102 24.102L480-455.897 253.897-229.795Z" />
            </svg>
          </button>
        </header>

        <section className={classNames(styles.Content, contentClassName)}>
          {children}
        </section>
      </dialog>
    </div>
  );
}
