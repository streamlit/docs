import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// import Navigation from
import MobileNav from "./mobileNav";

import headerStyles from "./header.module.css";

const ThemeToggle = dynamic(() => import("../utilities/themeToggle"), {
  ssr: false,
});
import Search from "../utilities/search";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleScroll = () => {
    let top = window.scrollY;
    top > 20 ? setIsSticky(true) : setIsSticky(false);
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  useEffect(() => {
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  let mobileNav;
  if (windowWidth <= 1024) {
    mobileNav = <MobileNav />;
  }

  return (
    <header
      className={`
        sticky
        top-0
        w-screen
        z-30
        ${headerStyles.Container}
      `}
    >
      <nav
        className={`
          container
          flex items-center justify-between
          relative
          bg-white
          transition-all
          border-b
          ${
            isSticky
              ? "h-12 border-b-gray-40 dark:border-b-gray-80"
              : "border-b-white dark:border-b-gray-100 h-24"
          }
        `}
        id="main-header"
      >
        <Link href="/">
          <a
            className="
              flex items-center
              m-0
              text-base tracking-tight
              not-link
            "
          >
            <img src="/logo.svg" alt="" className="mr-4" />
            <h4
              className="
              hidden xl:block
                m-0
                font-normal
                text-dark-gray-90 dark:text-white
              "
            >
              Documentation
            </h4>
          </a>
        </Link>
        <section
          className="
            flex items-center flex-auto justify-self-end
            gap-4 lg:gap-6
          "
        >
          <Search />
          <ThemeToggle />
          {mobileNav}
        </section>
      </nav>
    </header>
  );
};

export default Header;
