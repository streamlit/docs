import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const [tailwindTheme, setTailwindTheme] = useState("light-mode");
  let inactiveTheme;
  if (activeTheme !== undefined) {
    inactiveTheme = activeTheme === "light-mode" ? "dark-mode" : "light-mode";
  }
  const changeTheme = new Event("ChangeTheme");

  const changeTailwindTheme = (theme) => {
    setTailwindTheme(theme);

    if (theme === "light-mode") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark", "bg-gray-100");
    } else {
      document.documentElement.classList.add("dark", "bg-gray-100");
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    if (!activeTheme) return;
    document.body.dataset.theme = activeTheme;

    if (activeTheme === "light-mode") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    window.addEventListener(
      "ChangeTheme",
      function (e) {
        window.localStorage.setItem("theme", activeTheme);
      },
      false
    );
    window.dispatchEvent(changeTheme);
  }, [activeTheme]);

  return (
    <React.Fragment>
      <button
        aria-label={`Change to ${inactiveTheme} mode`}
        title={`Change to ${inactiveTheme} mode`}
        type="button"
        onClick={() => setActiveTheme(inactiveTheme)}
        className="toggleTheme"
      >
        {/* <span activeTheme={activeTheme} /> */}
        <i className="dark">dark_mode</i>
        <i className="light">light_mode</i>
      </button>
      {activeTheme === undefined && (
        <div
          onClick={
            tailwindTheme === "light-mode"
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
