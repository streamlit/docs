import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import dynamic from "next/dynamic";

// import Navigation from
import MobileNav from "./mobileNav";

import styles from "./header.module.css";

const ThemeToggle = dynamic(() => import("../utilities/themeToggle"), {
  ssr: false,
});
import Search from "../utilities/search";

const Header = ({ isSticky }) => {
  const [windowWidth, setWindowWidth] = useState();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  let mobileNav;
  if (windowWidth <= 1024) {
    mobileNav = <MobileNav />;
  }

  return (
    <header
      className={classNames(
        styles.Container,
        isSticky ? styles.stickyContainer : styles.standardContainer
      )}
    >
      <nav className={styles.Navigation} id="main-header">
        <Link href="/">
          <a className={classNames(styles.LogoContainer, "not-link")}>
            <img src="/logo.svg" alt="" />
            <h4 className={styles.LogoText}>Documentation</h4>
          </a>
        </Link>
        <section className={styles.NavigationContainer}>
          <Search />
          <ThemeToggle />
          {mobileNav}
        </section>
      </nav>
    </header>
  );
};

export default Header;
