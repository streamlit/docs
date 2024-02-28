import Link from "next/link";
import classNames from "classnames";

import styles from "./inlineCallout.module.css";

const InlineCallout = ({ children, icon, color, bold, href }) => {
  const backgroundColor = BG_CLASS[color];
  const textColor = FG_CLASS[color];
  return (
    <section className={styles.Container}>
      <Link
        href={href}
        className={classNames(
          styles.IconContainer,
          backgroundColor,
          "not-link",
        )}
      >
        <i className={styles.Icon}>{icon}</i>
      </Link>
      <article>
        <p className={styles.Text}>
          <Link
            href={href}
            className={classNames("not-link", styles.Link, textColor)}
          >
            {bold}
          </Link>{" "}
          {children}
        </p>
      </article>
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

export default InlineCallout;
