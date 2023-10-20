import React, { useEffect } from "react";
import classNames from "classnames";
import { MDXRemote } from "next-mdx-remote";

import styles from "./gdpr.module.css";

const TELEMETRY_PREFERENCE = "InsertTelemetry";
const TELEMETRY_PREFERENCE_DATE = "TelemetryDate";

export function setTelemetryPreference(accepted) {
  localStorage.setItem(TELEMETRY_PREFERENCE, JSON.stringify(accepted));
  localStorage.setItem(TELEMETRY_PREFERENCE_DATE, JSON.stringify(Date.now()));
}

// Check if the stored date is > 6 months old
const isConsentStale = (timestamp) => {
  const consent_date = new Date(parseInt(timestamp * 1000));
  const today = new Date();

  const six_months_in_ms =
    1000 /*ms*/ * 60 /*s*/ * 60 /*min*/ * 24 /*h*/ * 30 /*days*/ * 6; /*months*/
  return today - consent_date > six_months_in_ms;
};

function getTelemetryPreference() {
  // Returns true/false if user accepted/denied telemetry.
  // Returns null if user never accepted/denied or consent is stale.

  const telemetryPref = localStorage.getItem(TELEMETRY_PREFERENCE);
  const consentIsStale = isConsentStale(
    localStorage.getItem(TELEMETRY_PREFERENCE_DATE)
  );

  if (telemetryPref == null || consentIsStale) return null;

  return telemetryPref == "true";
}

export default function GDPRBanner({
  title,
  content,
  isTelemetryModalVisible,
  setIsTelemetryModalVisible,
  isTelemetryBannerVisible,
  setIsTelemetryBannerVisible,
  insertTelemetryCode,
  setInsertTelemetryCode,
  allowTelemetryAndCloseBanner,
  declineTelemetryAndCloseBanner,
}) {
  useEffect(() => {
    const pref = getTelemetryPreference();

    switch (pref) {
      case true:
        setInsertTelemetryCode(true);
        return;

      case false:
        // This is already false at initialization, but it doesn't hurt to do the right thing
        // here and make sure it's indeed false.
        setInsertTelemetryCode(false);
        return;

      case null:
        localStorage.clear(); // Do we even need this line?? Seems dangerous to just clear the entire localStorage, as maybe some other library could be using it.
        setIsTelemetryBannerVisible(true);
        return;

      default:
        console.log(`Unexpected telemetry preference: ${pref}`);
        return;
    }
  }, []);

  useEffect(() => {
    if (insertTelemetryCode) {
      insertTelemetry();
    }
  }, [insertTelemetryCode]);

  return (
    <>
      {isTelemetryBannerVisible && (
        <div
          className={classNames(
            isTelemetryBannerVisible === false ? "hidden" : "",
            "z-30 w-full fixed border-t border-gray-40 p-4 bottom-0",
            styles.Container
          )}
        >
          <div
            className={classNames(
              "flex flex-col lg:flex-row lg:items-center pl-4 pr-4 sm:pl-8 sm:pr-8"
            )}
          >
            <div className="flex-1">
              {title && (
                <h6 className="font-bold text-gray-90 text-lg sm:text-2xl">
                  {title}
                </h6>
              )}
              <MDXRemote {...content} />
            </div>
            <button
              className={classNames(
                "mt-4 lg:mt-0",
                "text-gray-90",
                "hover:text-gray-70 hover:underline",
                "order-last lg:order-none",
                styles.Link
              )}
              onClick={() =>
                setIsTelemetryModalVisible(!isTelemetryModalVisible)
              }
            >
              Cookie settings
            </button>
            <button
              className={classNames(
                "mt-4 lg:mt-0",
                "lg:ml-4",
                "py-2 px-3",
                "text-gray-90",
                "border-gray-90 border",
                "rounded",
                "hover:bg-gray-90",
                "hover:text-white",
                "active:bg-gray-90",
                "active:text-white",
                styles.Button
              )}
              onClick={declineTelemetryAndCloseBanner}
            >
              Reject all
            </button>
            <button
              className={classNames(
                "mt-4 lg:mt-0",
                "lg:ml-4",
                "py-2 px-3",
                "text-gray-90",
                "border-gray-90 border",
                "rounded",
                "hover:bg-gray-90",
                "hover:text-white",
                "active:bg-gray-90",
                "active:text-white",
                styles.Button
              )}
              onClick={allowTelemetryAndCloseBanner}
            >
              Accept all
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function insertTelemetry() {
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
