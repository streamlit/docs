import classNames from "classnames";

import content from "../../content/cookie-settings.md";

import styles from "./cookieSettingsModal.module.css";

export default function CookieSettingsModal({
  setIsTelemetryModalVisible,
  declineTelemetryAndCloseBanner,
  allowTelemetryAndCloseBanner,
}) {
  return (
    <div className="fixed w-full h-full z-40 bg-gray-90 bg-opacity-90 top-0 flex items-center justify-center">
      <div
        className={classNames(
          styles.Container,
          "relative",
          "bg-white rounded-xl",
          "p-8 md:p-12",
          "w-full max-w-4xl",
          "overscroll-none overflow-y-auto",
          "max-h-screen",
        )}
      >
        <button
          className="absolute right-4 top-4 md:right-11 md:top-11 fill-gray-70"
          onClick={() => setIsTelemetryModalVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="mt-2 w-8 h-8 hover:bg-gray-30 rounded"
          >
            <path d="m253.897-229.795-24.102-24.102L455.897-480 229.795-706.103l24.102-24.102L480-504.103l226.103-226.102 24.102 24.102L504.103-480l226.102 226.103-24.102 24.102L480-455.897 253.897-229.795Z" />
          </svg>
        </button>
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
        <button
          className={classNames(
            "mt-4 md:mt-8",
            "py-2 px-3",
            "text-gray-90",
            "border-gray-90 border",
            "rounded",
            "hover:bg-gray-90",
            "hover:text-white",
            "active:bg-gray-90",
            "active:text-white",
          )}
          onClick={declineTelemetryAndCloseBanner}
        >
          Reject all
        </button>
        <button
          className={classNames(
            "mt-4 md:mt-8 ml-4",
            "py-2 px-3",
            "text-gray-90",
            "border-gray-90 border",
            "rounded",
            "hover:bg-gray-90",
            "hover:text-white",
            "active:bg-gray-90",
            "active:text-white",
          )}
          onClick={allowTelemetryAndCloseBanner}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
