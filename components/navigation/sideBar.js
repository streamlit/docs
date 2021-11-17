import React, { useState, useEffect } from "react";
import bus from "../../lib/bus";
import NavItem from "../navigation/navItem";

const SideBar = ({ menu, slug, paths, version, maxVersion }) => {
  const [state, setState] = useState({
    condensed: false,
    loading: true,
    depth: 1,
    sticky: false,
    over: false,
    open: false,
    theme: "light-mode",
    menu,
  });

  const handleTheme = () => {
    setState({ ...state, theme: document.body.dataset.theme });
  };

  const handleScroll = () => {
    let top = window.scrollY;
    top > 20
      ? setState({ ...state, sticky: true })
      : setState({ ...state, sticky: false });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth < 1250 && window.innerWidth > 1024) {
      setState({ ...state, condensed: false });
      setState({ ...state, over: true });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1250 && window.innerWidth > 1024) {
      setState({ ...state, condensed: true });
      setState({ ...state, over: false });
    }
  };

  const checkExpanded = () => {
    if (window.innerWidth < 1250 && window.innerWidth > 1024) {
      setState({ ...state, condensed: true });
    } else {
      setState({ ...state, condensed: false });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkExpanded);
    window.addEventListener("ChangeTheme", handleTheme);

    bus.on("streamlit_nav_open", () => setState({ ...state, open: true }));
    bus.on("streamlit_nav_closed", () => setState({ ...state, open: false }));

    checkExpanded();
    setState({ ...state, slug: window.location.href });

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
      condensed={state.condensed}
      paths={paths}
      version={version}
      maxVersion={maxVersion}
    />
  ));

  return (
    <section
      className={`block-side-nav ${state.open ? "open" : ""} ${
        state.over ? "over" : ""
      } ${state.theme}`}
    >
      <nav
        className={`side-nav ${state.condensed ? "condensed" : "expanded"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul className="inner-nav">{navItems}</ul>
      </nav>
    </section>
  );
};

export default SideBar;
