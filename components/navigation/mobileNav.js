import React, { useState, useEffect } from "react";
import bus from "../../lib/bus";
import router from "next/router";

const MobileNav = () => {
  const [nav, setNav] = useState(false);

  const toggleMobileNav = () => {
    bus.emit(nav ? "streamlit_nav_closed" : "streamlit_nav_open");
    if (nav) {
      document.documentElement.classList.remove("nav-open");
    } else {
      document.documentElement.classList.add("nav-open");
    }
    setNav(!nav);
  };

  const handleRouteChange = () => {
    if (nav) {
      bus.emit(nav ? "streamlit_nav_closed" : "streamlit_nav_open");
      if (nav) {
        document.documentElement.classList.remove("nav-open");
      } else {
        document.documentElement.classList.add("nav-open");
      }
      setNav(false);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
  }, []);

  let mobileNav;

  mobileNav = (
    <button className="toggle-mobile" onClick={toggleMobileNav}>
      <i>menu</i>
    </button>
  );

  return mobileNav;
};

export default MobileNav;
