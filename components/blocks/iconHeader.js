import classNames from "classnames";

import styles from "./iconHeader.module.css";

const IconHeader = ({ icon, rotate, title, background, color }) => {
  return (
    <section className={classNames(styles.Container)}>
      <i
        className={classNames(
          styles.Icon,
          background === "violet-70"
            ? styles.VioletBackground
            : background === "l-blue-70"
            ? styles.LightBlueBackground
            : styles.OrangeBackground
        )}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {icon}
      </i>
      <h4
        className={classNames(
          styles.Title,
          background === "violet-70"
            ? styles.VioletText
            : background === "l-blue-70"
            ? styles.LightBlueText
            : styles.OrangeText
        )}
      >
        {title}
      </h4>
    </section>
  );
};

export default IconHeader;
