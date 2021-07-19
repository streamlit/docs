// import '../styles/globals.css'
import '../styles/main.scss'

// Loading indicator
import Router from 'next/router'
import NProgress from 'nprogress'

import { useState, useEffect } from 'react';

Router.events.on( 'routeChangeStart', () => NProgress.start() )
Router.events.on( 'routeChangeComplete', () => NProgress.done() )
Router.events.on( 'routeChangeError', () => NProgress.done() )

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


function StreamlitDocs({ Component, pageProps }) {
  const size = useWindowSize();
  return <Component window={{ width: size.width, height: size.height }} {...pageProps} />
}

export default StreamlitDocs
