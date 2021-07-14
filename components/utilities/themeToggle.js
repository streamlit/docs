import { useState, useEffect } from "react"
import bus from '../../lib/bus'

const ThemeToggle = () => {

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === "light-mode" ? "dark-mode" : "light-mode";

  const changeTheme = new Event('ChangeTheme');

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.addEventListener('ChangeTheme', function (e) {
      /* ... */
      window.localStorage.setItem("theme", activeTheme);
    }, false);
    window.dispatchEvent(changeTheme);
  }, [activeTheme]);

  return (
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
  );
};

export default ThemeToggle;
