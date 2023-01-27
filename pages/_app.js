import { debounce } from "lodash";

import "../styles/globals.css";
import "../components/utilities/searchModal.css";
import "../styles/main.scss";
import "../public/fonts/styles.css";

// Loading indicator
import Router from "next/router";
import NProgress from "nprogress";

import { useState, useEffect } from "react";

import { AppContextProvider } from "../context/AppContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const debouncedUpdateSize = debounce(handleResize, 200);

    // Add event listener
    window.addEventListener("resize", debouncedUpdateSize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", debouncedUpdateSize);
  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (navigator.platform.match("Mac") === null) {
      document.body.classList.add("mac");
    }
  });

  return windowSize;
}

function StreamlitDocs({ Component, pageProps }) {
  const size = useWindowSize();
  return (
    <AppContextProvider>
      <Component
        window={{ width: size.width, height: size.height }}
        {...pageProps}
      />
    </AppContextProvider>
  );
}

export default StreamlitDocs;
