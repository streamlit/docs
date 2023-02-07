import React, { useState } from "react";
import styles from "./collapse.module.css";
import classNames from "classnames";

const Collapse = ({ title, children, expanded = false }) => {
  const [show, setShow] = useState(expanded);

  return (
    <section className={styles.Container}>
      <div className={styles.PanelHeading} onClick={() => setShow(!show)}>
        <summary className={styles.PanelTitle}>
          <span className={styles.Title}>{title}</span>

          <i
            className={classNames(
              styles.PanelIcon,
              show ? styles.RotatedIcon : ""
            )}
          >
            expand_more
          </i>
        </summary>
        <div
          className={classNames(
            styles.PanelContent,
            show ? styles.PanelVisible : styles.PanelHidden
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
export default Collapse;
