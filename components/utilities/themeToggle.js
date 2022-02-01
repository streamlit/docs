import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./themeToggle.module.css";

const ThemeToggle = () => {
  const [activeThemeV1, setActiveThemeV1] = useState(
    document.body.dataset.theme
  );
  const [activeThemeV2, setActiveThemeV2] = useState("light-mode");
  let inactiveTheme;
  if (activeThemeV1 !== undefined) {
    inactiveTheme = activeThemeV1 === "light-mode" ? "dark-mode" : "light-mode";
  }
  const changeTheme = new Event("ChangeTheme");

  const changeTailwindTheme = (theme) => {
    setActiveThemeV2(theme);

    if (theme === "light-mode") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark", "bg-gray-100");
    } else {
      document.documentElement.classList.add("dark", "bg-gray-100");
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    if (!activeThemeV1) return;
    document.body.dataset.theme = activeThemeV1;

    if (activeThemeV1 === "light-mode") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    window.addEventListener(
      "ChangeTheme",
      function (e) {
        window.localStorage.setItem("theme", activeThemeV1);
      },
      false
    );
    window.dispatchEvent(changeTheme);
  }, [activeThemeV1]);

  return (
    <React.Fragment>
      <button
        aria-label={`Change to ${inactiveTheme} mode`}
        title={`Change to ${inactiveTheme} mode`}
        type="button"
        onClick={() => setActiveTheme(inactiveTheme)}
        className={styles.Container}
      >
        <i className={classNames(styles.DarkIcon, styles.Icon)}>dark_mode</i>
        <i className={classNames(styles.LightIcon, styles.Icon)}>light_mode</i>
      </button>
      {activeThemeV1 === undefined && (
        <div
          onClick={
            activeThemeV2 === "light-mode"
              ? () => changeTailwindTheme("dark-mode")
              : () => changeTailwindTheme("light-mode")
          }
        >
          Change Tailwind theme
        </div>
      )}
    </React.Fragment>
  );
};

export default ThemeToggle;
