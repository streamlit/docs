import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import classNames from "classnames";

import bus from "../../lib/bus";
import NavItem from "../navigation/navItem";

import styles from "./sideBar.module.css";

const SideBar = ({ menu, slug }) => {
  const [isCondensed, setIsCondensed] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light-mode");
  const [hasSlug, setHasSlug] = useState("");

  const handleTheme = () => {
    setTheme(document.body.dataset.theme);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth < 1250 && window.innerWidth >= 1024) {
      setIsCondensed(false);
      setIsOver(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1250 && window.innerWidth >= 1024) {
      setIsCondensed(true);
      setIsOver(false);
    }
  };

  const checkExpanded = () => {
    if (window.innerWidth < 1250 && window.innerWidth >= 1024) {
      setIsCondensed(true);
    } else {
      setIsCondensed(false);
    }
  };

  const debouncedCheckExpanded = debounce(checkExpanded, 200);

  useEffect(() => {
    window.addEventListener("resize", debouncedCheckExpanded);
    window.addEventListener("ChangeTheme", handleTheme);

    bus.on("streamlit_nav_open", () => setIsOpen(true));
    bus.on("streamlit_nav_closed", () => setIsOpen(false));

    checkExpanded();
    setHasSlug(window.location.href);

    return () => {
      window.removeEventListener("resize", debouncedCheckExpanded);
      window.removeEventListener("ChangeTheme", handleTheme);
    };
  }, []);

  let navItems;
  navItems = menu.map((page) => (
    <NavItem
      slug={slug}
      key={page.menu_key}
      page={page}
      depth={page.depth + 1}
      condensed={isCondensed}
      // className={isOver && styles.OverNavItem}
    />
  ));

  return (
    <section
      className={classNames(
        styles.Container,
        isOpen ? styles.OpenNav : styles.ClosedNav,
        isOver ? styles.OverNav : styles.CollapsedNav
      )}
    >
      <nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ul className={styles.NavList}>{navItems}</ul>
      </nav>
    </section>
  );
};

export default SideBar;
