import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { containsAnchor } from "../../scripts/contains-anchor";

import styles from "./refCard.module.css";

const RefCard = ({ children, size, href, deprecated }) => {
  const router = useRouter();
  const containsAnchorTag = containsAnchor(children);

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

  const handleCardClick = (e) => {
    if (e.target.tagName !== "A") {
      router.push(href);
    }
  };

  const Wrapper = containsAnchorTag ? "div" : Link;
  const wrapperProps = containsAnchorTag
    ? {
        onClick: handleCardClick,
        className: classNames(styles.Container, tileSize),
      }
    : { href, className: classNames(styles.Container, tileSize) };

  const deprecatedContent =
    deprecated === true ? (
      <div className={classNames("group", styles.DeprecationNotice)}>
        <span
          className={classNames(
            "h-3 w-3 p-0 transform rotate-45 absolute right-[13px] -top-2 bg-orange-10 transition ease-in-out duration-100 opacity-0 group-hover:opacity-100",
            styles.DeprecatedArrow,
          )}
        />
        <i
          className={classNames("material-icons-sharp", styles.DeprecatedIcon)}
        >
          {"delete"}
        </i>
      </div>
    ) : null;

  return (
    <Wrapper {...wrapperProps}>
      {deprecatedContent}
      {children}
    </Wrapper>
  );
};

export default RefCard;
