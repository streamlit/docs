import classNames from "classnames";
import Kapa from "../utilities/kapa";
import styles from "./chatSticky.module.css";

const ChatSticky = () => {
  return (
    <div className={classNames(styles.Container)}>
      <nav className={styles.Navigation} id="chat-sticky">
        <section className={styles.NavigationContainer}>
          <Kapa />
        </section>
      </nav>
    </div>
  );
};

export default ChatSticky;
