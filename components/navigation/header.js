import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// import Navigation from
import MobileNav from "./mobileNav";

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
    <header className={`${isSticky ? "sticky" : ""}`}>
      <nav className="container" id="main-header">
        <Link href="/">
          <a className="brand not-link">
            <img src="/logo.svg" alt="" />
            <h4>Documentation</h4>
          </a>
        </Link>
        <section className="options">
          <Search />
          <ThemeToggle />
          {mobileNav}
        </section>
      </nav>
    </header>
  );
};

export default Header;
