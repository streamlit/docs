import classNames from "classnames";

import styles from "./iconHeader.module.css";

const IconHeader = ({ icon, rotate, title, background, color }) => {
  return (
    <section className={classNames(styles.Container)}>
      <i
        className={classNames(styles.Icon, BG_CLASS[background])}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {icon}
      </i>
      <h4 className={classNames(styles.Title, FG_CLASS[background])}>
        {title}
      </h4>
    </section>
  );
};

const BG_CLASS = {
  "red-70": styles.RedBackground,
  "orange-70": styles.OrangeBackground,
  "yellow-70": styles.YellowBackground,
  "green-70": styles.GreenBackground,
  "acqua-70": styles.AcquaBackground,
  "lightBlue-70": styles.LightBlueBackground,
  "darkBlue-70": styles.DarkBlueBackground,
  "indigo-70": styles.IndigoBackground,
  "gray-70": styles.GrayBackground,
  unset: styles.TransparentBackground,
};

const FG_CLASS = {
  "red-70": styles.RedForeground,
  "orange-70": styles.OrangeForeground,
  "yellow-70": styles.YellowForeground,
  "green-70": styles.GreenForeground,
  "acqua-70": styles.AcquaForeground,
  "lightBlue-70": styles.LightBlueForeground,
  "darkBlue-70": styles.DarkBlueForeground,
  "indigo-70": styles.IndigoForeground,
  "gray-70": styles.GrayForeground,
  unset: styles.TransparentForeground,
};

export default IconHeader;
