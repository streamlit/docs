import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./themeToggle.module.css";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  let inactiveTheme;
  inactiveTheme = activeTheme === "light" ? "dark" : "light";

  const getUserPreference = () => {
    if (window.localStorage.getItem("theme")) {
      return window.localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const changeTailwindTheme = (theme) => {
    inactiveTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(inactiveTheme);
    setActiveTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const showTooltip = () => {
    document.getElementsByClassName(styles.Tooltip)[0].style.display = "block";
  };

  const hideTooltip = () => {
    document.getElementsByClassName(styles.Tooltip)[0].style.display = "none";
  };

  useEffect(() => {
    if (getUserPreference() === "dark") {
      changeTailwindTheme("dark");
    } else {
      changeTailwindTheme("light");
    }
  }, [activeTheme]);

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={
          activeTheme === "light"
            ? () => changeTailwindTheme("dark")
            : () => changeTailwindTheme("light")
        }
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        className={styles.Container}
      >
        <i className={classNames(styles.DarkIcon, styles.Icon)}>dark_mode</i>
        <i className={classNames(styles.LightIcon, styles.Icon)}>light_mode</i>
      </button>
      <div className={styles.Tooltip}>
        <p>Change to {inactiveTheme} mode</p>
      </div>
    </React.Fragment>
  );
};

export default ThemeToggle;
