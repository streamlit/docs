// Global Imports
import { useState, useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";

// The first timezone in Europe is UTC+0.
const EUROPE_TZ_OFFSET_WEST = 0;

// The last timezone in Europe is UTC+3.
// The minus sign is because that's how the API works:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset#description
const EUROPE_TZ_OFFSET_EAST = -3 * 60;

const KEY = "InsertAnalyticsCode";

export default function GDPRBanner(gdrp_data) {
  const title = gdrp_data.title;
  const content = gdrp_data.content;
  const data = gdrp_data.data;

  const currentTzOffset = new Date().getTimezoneOffset();

  const isWestOfEurope = currentTzOffset > EUROPE_TZ_OFFSET_WEST;
  const isEastOfEurope = currentTzOffset < EUROPE_TZ_OFFSET_EAST;
  const isOutsideEurope = isWestOfEurope || isEastOfEurope;
  const mayBeInEurope = !isOutsideEurope; // May also be Africa or Middle East...

  if (typeof window === "undefined") return null;

  const localStorageIsSetUp = localStorage.getItem(KEY) != null;

  // Default to use cookies when outside Europe.
  if (!localStorageIsSetUp && isOutsideEurope) {
    localStorage.setItem(KEY, true);
  }

  // Only show banner if not in europe and banner wasn't already shown.
  const showBanner = mayBeInEurope && !localStorageIsSetUp;

  const [isVisible, setIsVisible] = useState(showBanner);
  const [insertAnalyticsCode, setInsertAnalyticsCode] = useState(
    localStorage.getItem(KEY) == "true"
  );

  const AllowAndCloseBanner = (e) => {
    // Update state and set the decision into localStorage
    setIsVisible(false);
    const allow = true;
    setInsertAnalyticsCode(allow);
    localStorage.setItem(KEY, allow);
  };

  const DeclineAndCloseBanner = (e) => {
    // Update state and set the decision into localStorage
    setIsVisible(false);
    const allow = false;
    setInsertAnalyticsCode(allow);
    localStorage.setItem(KEY, allow);
  };

  useEffect(() => {
    if (insertAnalyticsCode) {
      insertAnalytics();
    }
  }, [insertAnalyticsCode]);

  if (!isVisible) {
    return "";
  }

  return (
    <div className="gdpr-banner">
      <div className="container">
        <div className="header">
          <h3>{title}</h3>
          <MDXRemote {...content} />
        </div>
        <div className="footer">
          <button onClick={DeclineAndCloseBanner}>Decline</button>
          <button onClick={AllowAndCloseBanner}>Allow</button>
        </div>
      </div>
    </div>
  );
}

function insertAnalytics() {
  (function () {
    var analytics = (window.analytics = window.analytics || []);
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error("Segment snippet included twice.");
      else {
        analytics.invoked = !0;
        analytics.methods = [
          "trackSubmit",
          "trackClick",
          "trackLink",
          "trackForm",
          "pageview",
          "identify",
          "reset",
          "group",
          "track",
          "ready",
          "alias",
          "debug",
          "page",
          "once",
          "off",
          "on",
          "addSourceMiddleware",
          "addIntegrationMiddleware",
          "setAnonymousId",
          "addDestinationMiddleware",
        ];
        analytics.factory = function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments);
            t.unshift(e);
            analytics.push(t);
            return analytics;
          };
        };
        for (var e = 0; e < analytics.methods.length; e++) {
          var key = analytics.methods[e];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function (key, e) {
          var t = document.createElement("script");
          t.type = "text/javascript";
          t.async = !0;
          t.src =
            "https://cdn.segment.com/analytics.js/v1/" +
            key +
            "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(t, n);
          analytics._loadOptions = e;
        };
        analytics._writeKey = "5oR9PCgKBs3VqmQCMiiajboWKKBUa4dA";
        analytics.SNIPPET_VERSION = "4.13.2";
        analytics.load("5oR9PCgKBs3VqmQCMiiajboWKKBUa4dA");
        analytics.page();
      }
  })();
}
