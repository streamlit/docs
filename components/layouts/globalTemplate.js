import React, { useState, useEffect } from "react";
import Header from "../navigation/header";
import ChatSticky from "../navigation/chatSticky";

import styles from "./globalTemplate.module.css";

const Layout = ({ children, versionProps }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    let top = window.scrollY;
    top > 20 ? setIsSticky(true) : setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main id="root" className="dark:bg-gray-100">
      <Header isSticky={isSticky} versionProps={versionProps} />
      <div className={isSticky ? styles.stickyPageWrapper : undefined}>
        {children}
      </div>
      <ChatSticky />
    </main>
  );
};

export default Layout;
