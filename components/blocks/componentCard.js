import classNames from "classnames";

import genericStyles from "./refCard.module.css";
import customStyles from "./componentCard.module.css";
import { useCallback } from "react";

const ComponentCard = ({ children, href }) => {
  const onClick = useCallback(() => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, [href]);

  return (
    <div
      className={classNames(
        genericStyles.Container,
        customStyles.Container,
        "refcard",
        "code-light",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ComponentCard;
