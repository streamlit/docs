import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  applyThemeAndPersist,
  getPreferredTheme,
  getThemeFromDOM,
} from "./theme";

const ThemeContext = createContext();

/**
 * Updates all Streamlit Cloud iframes on the page with the new theme.
 * This is extracted as a shared function so it can be called from multiple places.
 */
export function updateIframeThemes(theme) {
  if (typeof document === "undefined") return;

  const iframes = document.querySelectorAll('iframe[src*="streamlit.app"]');
  iframes.forEach((iframe) => {
    iframe.src = getThemedUrl(iframe.src, theme);
  });
}

export function ThemeContextProvider({ children }) {
  // Initialize from DOM if available (so we match the pre-hydration bootstrap),
  // otherwise default to "light" for SSR.
  const [theme, setThemeState] = useState(() =>
    typeof document === "undefined" ? "light" : getThemeFromDOM(),
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Set theme and update everything
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    applyThemeAndPersist(newTheme);
    updateIframeThemes(newTheme);
  }, []);

  // Initialize theme on mount (client-side only)
  useEffect(() => {
    const preferredTheme = getPreferredTheme();

    // If the pre-hydration bootstrap ever drifts from our runtime logic,
    // fail loudly in dev so we don't reintroduce flashes.
    if (process.env.NODE_ENV !== "production") {
      const domTheme = getThemeFromDOM();
      if (domTheme !== preferredTheme) {
        // eslint-disable-next-line no-console
        console.warn(
          `[theme] DOM theme (${domTheme}) differs from preferredTheme (${preferredTheme}). This indicates theme bootstrap drift.`,
        );
      }
    }

    setThemeState(preferredTheme);
    applyThemeAndPersist(preferredTheme);
    setIsInitialized(true);
  }, []);

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
 * Adds a "light" or "dark" theme to a given Streamlit Cloud URL.
 */
export function getThemedUrl(url, theme) {
  const themedUrl = new URL(url);
  addThemeToSearchParams(themedUrl.searchParams, theme);
  return themedUrl.toString();
}

export function addThemeToSearchParams(searchParams, theme) {
  const existingEmbedOptions = searchParams.getAll("embed_options");

  const nonThemeOptions = existingEmbedOptions.filter(
    (option) => option !== "light_theme" && option !== "dark_theme",
  );

  // Clear all embed_options and re-add the non-theme ones
  searchParams.delete("embed_options");
  nonThemeOptions.forEach((option) =>
    searchParams.append("embed_options", option),
  );

  searchParams.append("embed_options", `${theme}_theme`);
}

export { getThemeFromDOM } from "./theme";
