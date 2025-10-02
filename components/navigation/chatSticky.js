import classNames from "classnames";
import Kapa from "../utilities/kapa";
import styles from "./chatSticky.module.css";

const ChatSticky = () => {
  return (
    <div className={classNames(styles.Container)}>
      <Kapa />
    </div>
  );
};

export default ChatSticky;
