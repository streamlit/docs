import Link from "next/link";
import classNames from "classnames";

import styles from "./refCard.module.css";

const RefCard = ({ children, size, href, deprecated }) => {
  const tileSize =
    size === "full"
      ? styles.Full
      : size === "half"
      ? styles.Half
      : size === "third"
      ? styles.Third
      : size === "two-third"
      ? styles.TwoThirds
      : styles.Third;

  return (
    <Link href={href}>
      <a className={classNames(styles.Container, tileSize)}>
        {deprecated === true ? (
          <div className={classNames("group", styles.DeprecationNotice)}>
            <span className="h-3 w-3 p-0 transform rotate-45 absolute absolute right-3 -top-2 bg-orange-30 transition ease-in-out duration-100 opacity-0 group-hover:opacity-100"></span>
            <i
              className={classNames(
                "material-icons-sharp",
                styles.DeprecatedIcon
              )}
            >
              {"info"}
            </i>
          </div>
        ) : (
          ""
        )}
        {children}
      </a>
    </Link>
  );
};

export default RefCard;
