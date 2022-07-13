// Global Imports
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { MDXRemote } from "next-mdx-remote";
import { ReactComponent as CookieEmoji } from "../../images/icons/cookie.svg";

import styles from "./gdpr.module.css";

const KEY = "InsertAnalyticsCode";

const GDPRBanner = (gdprData) => {
  const title = gdprData.title;
  const content = gdprData.content;
  const data = gdprData.data;

  const router = useRouter();
  const path = router.asPath;

  const userIsInEurope = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.startsWith("Europe");

  if (typeof window === "undefined") return null;

  const localStorageIsSetUp = localStorage.getItem(KEY) != null;

  // Default to use cookies when outside Europe.
  if (!localStorageIsSetUp && !userIsInEurope) {
    localStorage.setItem(KEY, true);
  }

  // Only show banner if not in europe and banner wasn't already shown.
  const showBanner = userIsInEurope && !localStorageIsSetUp;

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
    <div className={styles.Container}>
      <div className={styles.BannerBackground}>
        <div className={styles.ImageContainer}>
          <CookieEmoji className={styles.Image} />
        </div>
        <div className={styles.TextContainer}>
          <h3 className={styles.Title}>{title}</h3>
          <MDXRemote {...content} />
          <div className={styles.CtasContainer}>
            <button
              onClick={DeclineAndCloseBanner}
              className={classNames(styles.Button, styles.DeclineButton)}
            >
              Decline
            </button>
            <button
              onClick={AllowAndCloseBanner}
              className={classNames(styles.Button, styles.AllowButton)}
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        analytics._writeKey = "pUoB6ihRTAFLDtLp2NWEuJvBNtiooQwE";
        analytics.SNIPPET_VERSION = "4.13.2";
        analytics.load("pUoB6ihRTAFLDtLp2NWEuJvBNtiooQwE");
        analytics.page();
      }
  })();
}

export default GDPRBanner;
