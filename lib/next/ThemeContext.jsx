import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ThemeContext = createContext();

/**
 * Updates all Streamlit Cloud iframes on the page with the new theme.
 * This is extracted as a shared function so it can be called from multiple places.
 */
export function updateIframesTheme(theme) {
  if (typeof document === "undefined") return;

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
}

/**
 * Gets the user's theme preference from localStorage or system preference.
 * Returns "light" as default for SSR.
 */
function getUserPreference() {
  if (typeof window === "undefined") {
    return "light";
  }
  if (window.localStorage.getItem("theme")) {
    return window.localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeContextProvider({ children }) {
  // Initialize with "light" for SSR, will be updated on mount
  const [theme, setThemeState] = useState("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Apply theme to DOM and localStorage
  const applyTheme = useCallback((newTheme) => {
    if (typeof document === "undefined") return;

    const inactiveTheme = newTheme === "light" ? "dark" : "light";
    document.documentElement.classList.add(newTheme);
    document.documentElement.classList.remove(inactiveTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  // Set theme and update everything
  const setTheme = useCallback(
    (newTheme) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      updateIframesTheme(newTheme);
    },
    [applyTheme],
  );

  // Initialize theme on mount (client-side only)
  useEffect(() => {
    const preferredTheme = getUserPreference();
    setThemeState(preferredTheme);
    applyTheme(preferredTheme);
    setIsInitialized(true);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider",
    );
  }
  return context;
}

/**
 * Safe version of useThemeContext that returns null if not within a provider.
 * Useful for components that may be rendered outside the provider (e.g., SSR).
 */
export function useThemeContextSafe() {
  return useContext(ThemeContext);
}

/**
 * Gets the current theme from DOM (for use in non-React contexts or SSR fallback).
 * Returns "light" as default if document is not available.
 */
export function getThemeFromDOM() {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
  return "light";
}
