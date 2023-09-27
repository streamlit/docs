import classNames from "classnames";

import genericStyles from "./refCard.module.css";
import customStyles from "./componentCard.module.css";

const ComponentCard = ({ children, href }) => {
  return (
    <a
      className={classNames(genericStyles.Container, customStyles.Container)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ComponentCard;
