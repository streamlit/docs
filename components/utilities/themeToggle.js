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

    // Force reload all Cloud iframes on the current page
    const iframes = document.querySelectorAll('iframe[src*="streamlit.app"]');
    iframes.forEach((iframe) => {
      const currentSrc = iframe.src;
      const url = new URL(currentSrc);

      // Get all existing embed_options
      const existingEmbedOptions = url.searchParams.getAll("embed_options");

      // Remove only theme-related embed_options (light_theme or dark_theme)
      const nonThemeOptions = existingEmbedOptions.filter(
        (option) => option !== "light_theme" && option !== "dark_theme",
      );

      // Clear all embed_options and re-add the non-theme ones
      url.searchParams.delete("embed_options");
      nonThemeOptions.forEach((option) =>
        url.searchParams.append("embed_options", option),
      );

      // Add new theme parameter
      url.searchParams.append("embed_options", `${theme}_theme`);

      // Force reload iframe with new theme
      iframe.src = url.toString();
    });
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
