import React from "react";
import classNames from "classnames";
import styles from "./themeToggle.module.css";
import { useThemeContext } from "../../lib/next/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();
  const inactiveTheme = theme === "light" ? "dark" : "light";

  const toggleTheme = () => {
    setTheme(inactiveTheme);
  };

  const showTooltip = () => {
    document.getElementsByClassName(styles.Tooltip)[0].style.display = "block";
  };

  const hideTooltip = () => {
    document.getElementsByClassName(styles.Tooltip)[0].style.display = "none";
  };

  return (
    <div className={styles.Wrapper}>
      <button
        type="button"
        onClick={toggleTheme}
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
    </div>
  );
};

export default ThemeToggle;
