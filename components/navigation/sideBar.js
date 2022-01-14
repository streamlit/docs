import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import bus from "../../lib/bus";
import NavItem from "../navigation/navItem";

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
    if (window.innerWidth < 1250 && window.innerWidth > 1024) {
      setIsCondensed(false);
      setIsOver(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1250 && window.innerWidth > 1024) {
      setIsCondensed(true);
      setIsOver(false);
    }
  };

  const checkExpanded = () => {
    if (window.innerWidth < 1250 && window.innerWidth > 1024) {
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
      className={isOver ? "" : "lg:hidden xl:block"}
    />
  ));

  return (
    <section
      className={`
        fixed
        top-0
        left-0
        py-24 px-4 sm:px-24 lg:px-5 lg:py-24
        h-screen
        z-10
        bg-white dark:bg-gray-100
        w-10/12 md:w-9/12 xl:w-screen
        lg:max-w-none xl:max-w-xs
        overflow-y-auto
        shadow-lg lg:shadow-none
        transition-all
        ${isOpen ? "block" : "hidden lg:block"}
        ${isOver ? "lg:shadow-lg" : "lg:w-36"}
      `}
    >
      <nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ul className="list-none overscroll-contain m-0">{navItems}</ul>
      </nav>
    </section>
  );
};

export default SideBar;
