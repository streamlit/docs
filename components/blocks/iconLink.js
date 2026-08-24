import Link from "next/link";

import classNames from "classnames";

import styles from "./iconLink.module.css";

export default ({
  children,
  label,
  href,
  icon,
  target,
  className,
  iconClassName,
  contentClassName,
  cssModuleClassName,
  cssModuleIconClassName,
  cssModuleContentClassName,
}) => {
  href = href ?? "#";
  const content = children || label;

  return (
    <Link
      href={href}
      className={classNames(
        "not-link",
        "group",
        styles.Link,
        className,
        cssModuleClassName ? styles[cssModuleClassName] : null,
      )}
      target={target == "_blank" ? target : "_self"}
    >
      <i
        className={classNames(
          styles.Icon,
          iconClassName,
          cssModuleIconClassName ? styles[cssModuleIconClassName] : null,
        )}
      >
        {icon}
      </i>

      <span
        className={classNames(
          styles.Truncate,
          contentClassName,
          cssModuleContentClassName ? styles[cssModuleContentClassName] : null,
        )}
      >
        {content}
      </span>
    </Link>
  );
};
