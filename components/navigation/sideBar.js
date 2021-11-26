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

  useEffect(() => {
    window.addEventListener("resize", checkExpanded);
    window.addEventListener("ChangeTheme", handleTheme);

    bus.on("streamlit_nav_open", () => setIsOpen(true));
    bus.on("streamlit_nav_closed", () => setIsOpen(false));

    checkExpanded();
    setHasSlug(window.location.href);

    return () => {
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
    />
  ));

  return (
    <section
      className={`block-side-nav ${isOpen ? "open" : ""} ${
        isOver ? "over" : ""
      } ${theme}`}
    >
      <nav
        className={`side-nav ${isCondensed ? "condensed" : "expanded"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul className="inner-nav">{navItems}</ul>
      </nav>
    </section>
  );
};

export default SideBar;
