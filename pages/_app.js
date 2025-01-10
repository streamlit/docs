import "../styles/globals.css";
import "../components/utilities/searchModal.css";
import "../components/utilities/kapaModal.css";
import "../styles/main.scss";
import "../public/fonts/styles.css";

// Loading indicator
import Router from "next/router";
import NProgress from "nprogress";

import { useEffect } from "react";

import { AppContextProvider } from "../context/AppContext";
import { VersionContextProvider } from "../context/VersionContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function StreamlitDocs({ Component, pageProps }) {
  useEffect(() => {
    if (navigator.platform.includes("Mac")) {
      document.body.classList.add("mac");
    }
  }, []);

  return (
    <AppContextProvider>
      <VersionContextProvider
        versionFromStaticLoad={pageProps.versionFromStaticLoad}
        platformFromStaticLoad={pageProps.platformFromStaticLoad}
        functionName={null}
        currMenuItem={pageProps.currMenuItem}
      >
        <Component {...pageProps} />
      </VersionContextProvider>
    </AppContextProvider>
  );
}

export default StreamlitDocs;
