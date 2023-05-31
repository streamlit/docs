import { debounce } from "lodash";

import "../styles/globals.css";
import "../components/utilities/searchModal.css";
import "../styles/main.scss";
import "../public/fonts/styles.css";

// Loading indicator
import Router from "next/router";
import NProgress from "nprogress";

import { useEffect } from "react";

import { AppContextProvider } from "../context/AppContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

useEffect(() => {
  if (navigator.platform.match("Mac") === null) {
    document.body.classList.add("mac");
  }
}, []);

function StreamlitDocs({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default StreamlitDocs;
