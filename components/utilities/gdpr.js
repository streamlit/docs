// Global Imports
import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { MDXRemote } from "next-mdx-remote";
import { ReactComponent as CookieEmoji } from "../../images/icons/cookie.svg";

import styles from "./gdpr.module.css";

const KEY = "InsertAnalyticsCode";

const GDPRBanner = (gdprData) => {
  const title = gdprData.title;
  const content = gdprData.content;

  // Start with default values
  const [isVisible, setIsVisible] = useState(true);
  const [insertAnalyticsCode, setInsertAnalyticsCode] = useState(false);

  const AllowAndCloseBanner = useCallback(() => {
    // Update state and set the decision into localStorage
    setIsVisible(false);
    setInsertAnalyticsCode(true);
    localStorage.setItem(KEY, JSON.stringify(Date.now()));
  }, [isVisible, insertAnalyticsCode]);

  const DeclineAndCloseBanner = useCallback(() => {
    // Update state and set the decision into localStorage
    setIsVisible(false);
    setInsertAnalyticsCode(false);
    localStorage.setItem(KEY, false);
  }, [isVisible, insertAnalyticsCode]);

  useEffect(() => {
    // Check if there's something in localStorage, and update the banner visibility based on that
    const localStorageIsSetUp = localStorage.getItem(KEY) != null;
    setIsVisible(!localStorageIsSetUp);

    if (localStorageIsSetUp) {
      setInsertAnalyticsCode(localStorage.getItem(KEY) != "false");
    }
  }, []);

  useEffect(() => {
    // TODO: Check if timestamp > 1 year, then show banner again before adding snippet
    if (insertAnalyticsCode) {
      insertAnalytics();
    }
  }, [insertAnalyticsCode]);

  return (
    <>
      {isVisible && (
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
      )}
    </>
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
