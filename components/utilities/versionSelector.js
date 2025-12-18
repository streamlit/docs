import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import getConfig from "next/config";

import { looksLikeVersionAndPlatformString } from "../../lib/next/utils";
import styles from "./versionSelector.module.css";

const { publicRuntimeConfig } = getConfig();

const LATEST_VERSION = publicRuntimeConfig.LATEST_VERSION;
const DEFAULT_VERSION = publicRuntimeConfig.DEFAULT_VERSION;
const VERSIONS_LIST = publicRuntimeConfig.VERSIONS_LIST;

const VersionSelector = ({ version, slug, goToLatest, isMobile = false }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentNumericVersion =
    version == DEFAULT_VERSION ? LATEST_VERSION : version;
  const isOldVersion = currentNumericVersion != LATEST_VERSION;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectVersion = (selectedVersion) => {
    setIsOpen(false);
    const slicedSlug = slug.slice();

    if (selectedVersion !== currentNumericVersion) {
      if (looksLikeVersionAndPlatformString(slicedSlug[0])) {
        slicedSlug.shift();
      }
      if (selectedVersion !== LATEST_VERSION) {
        slicedSlug.unshift(selectedVersion);
      } else {
        goToLatest();
      }
    }

    router.push(`/${slicedSlug.join("/")}`);
  };

  const containerClass = isMobile ? styles.MobileContainer : styles.Container;

  return (
    <div
      className={classNames(containerClass, {
        [styles.OldVersion]: isOldVersion,
      })}
    >
      <span className={styles.Prefix}>Show API reference for</span>
      <div className={styles.DropdownWrapper} ref={dropdownRef}>
        <button
          type="button"
          className={styles.DropdownButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {isOldVersion && (
            <i
              className={classNames("material-icons-sharp", styles.WarningIcon)}
            >
              priority_high
            </i>
          )}
          <span
            className={classNames(styles.SelectedValue, {
              [styles.OldVersionText]: isOldVersion,
            })}
          >
            Version {currentNumericVersion}
          </span>
          <i
            className={classNames("material-icons-sharp", styles.Arrow, {
              [styles.ArrowOpen]: isOpen,
            })}
          >
            expand_more
          </i>
        </button>
        {isOpen && (
          <ul className={styles.DropdownMenu} role="listbox">
            {VERSIONS_LIST.map((ver) => (
              <li
                key={ver}
                role="option"
                aria-selected={ver === currentNumericVersion}
                className={classNames(styles.DropdownItem, {
                  [styles.DropdownItemSelected]: ver === currentNumericVersion,
                })}
                onClick={() => handleSelectVersion(ver)}
              >
                <span>Version {ver}</span>
                {ver === currentNumericVersion && (
                  <i
                    className={classNames(
                      "material-icons-sharp",
                      styles.CheckIcon,
                    )}
                  >
                    check
                  </i>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VersionSelector;
