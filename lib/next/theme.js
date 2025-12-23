const THEME_STORAGE_KEY = "theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

function isValidTheme(theme) {
  return theme === THEME_LIGHT || theme === THEME_DARK;
}

/**
 * Returns the preferred theme based on explicit user choice (localStorage) or
 * OS preference (prefers-color-scheme). Defaults to "light" when window is not
 * available (SSR).
 */
export function getPreferredTheme() {
  if (typeof window === "undefined") {
    return THEME_LIGHT;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isValidTheme(stored)) return stored;
  } catch {
    // localStorage can throw in some environments; ignore and fall back.
  }

  try {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME_DARK
      : THEME_LIGHT;
  } catch {
    return THEME_LIGHT;
  }
}

/**
 * Applies theme to the root element in a way compatible with Tailwind's
 * `dark:` class strategy.
 */
export function applyThemeToDOM(theme) {
  if (typeof document === "undefined") {
    return;
  }
  if (!isValidTheme(theme)) {
    return;
  }

  const inactiveTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
  const root = document.documentElement;
  root.classList.add(theme);
  root.classList.remove(inactiveTheme);

  // Hint to the browser for built-in UI (form controls, scrollbars, etc.)
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures.
  }
}

export function getThemeFromDOM() {
  if (typeof document === "undefined") {
    return THEME_LIGHT;
  }

  return document.documentElement.classList.contains(THEME_DARK)
    ? THEME_DARK
    : THEME_LIGHT;
}

/**
 * Inline script string to apply theme before first paint (prevents flash).
 *
 * NOTE: Keep this aligned with `getPreferredTheme()` + `applyThemeToDOM()`.
 * We intentionally centralize this generator in the same module to reduce drift.
 */
export function getThemeBootstrapScript() {
  // Keep this compact: it runs on every page view before hydration.
  return `!function(){try{var e=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY,
  )}),t=e==="${THEME_DARK}"||e==="${THEME_LIGHT}"?e:(matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"${THEME_DARK}":"${THEME_LIGHT}"),o=document.documentElement;o.classList.add(t),o.classList.remove(t==="${THEME_DARK}"?"${THEME_LIGHT}":"${THEME_DARK}"),o.style.colorScheme=t}catch(e){}}();`;
}
