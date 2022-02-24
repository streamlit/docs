import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./themeToggle.module.css";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  let inactiveTheme;

  const getUserPreference = () => {
    if (window.localStorage.getItem("theme")) {
      return window.localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const changeTailwindTheme = (theme) => {
    if (theme === "dark") {
      inactiveTheme = "light";
    } else {
      inactiveTheme = "dark";
    }
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(inactiveTheme);
    setActiveTheme(theme);
    localStorage.setItem("theme", theme);
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
        aria-label={`Change to ${inactiveTheme} mode`}
        title={`Change to ${inactiveTheme} mode`}
        type="button"
        onClick={
          activeTheme === "light"
            ? () => changeTailwindTheme("dark")
            : () => changeTailwindTheme("light")
        }
        className={styles.Container}
      >
        <i className={classNames(styles.DarkIcon, styles.Icon)}>dark_mode</i>
        <i className={classNames(styles.LightIcon, styles.Icon)}>light_mode</i>
      </button>
    </React.Fragment>
  );
};

export default ThemeToggle;
