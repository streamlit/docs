import React, { useState, useEffect, useCallback } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import styles from "./versionSelector.module.css";
import {
  useVersion,
  DEFAULT_PLATFORM,
  getBestNumericVersion,
  versionAndPlatformAreCompatible,
} from "../../context/VersionContext";
import { CurrentRefinements } from "react-instantsearch-dom";

// const VERSIONS_LIST = publicRuntimeConfig.VERSIONS_LIST;
// const LATEST_OSS_VERSION = publicRuntimeConfig.LATEST_OSS_VERSION;
// const PLATFORM_VERSIONS = publicRuntimeConfig.PLATFORM_VERSIONS;
// const PLATFORM_LATEST_VERSIONS = publicRuntimeConfig.PLATFORM_LATEST_VERSIONS;
// const PLATFORMS = [DEFAULT_PLATFORM].concat(Object.keys(PLATFORM_VERSIONS))
const PLATFORMS = [
  { id: "oss", name: "None" },
  { id: "sis", name: "Streamlit in Snowflake" },
  { id: "na", name: "Native Apps" },
];

const VersionSelector = ({
  versionList,
  snowflakeVersions,
  functionObject,
}) => {
  const {
    version: versionContext,
    platform: platformContext,
    setVersionAndPlatform,
  } = useVersion();

  const [numericVersion, compatiblePlatform] = getBestNumericVersion(
    versionContext,
    platformContext,
    versionList,
    snowflakeVersions,
  );

  const [widgetPlatform, setWidgetPlatform] = useState(compatiblePlatform);

  const handleSelectPlatform = useCallback(
    (selectedPlatform) => {
      if (
        selectedPlatform != platformContext &&
        versionAndPlatformAreCompatible(
          // versionContext can be DEFAULT_VERSION (null) or "1.40.0" (even if that's the latest).
          versionContext,
          selectedPlatform,
          versionList,
          snowflakeVersions,
        )
      ) {
        // Navigate to new version and platform.
        setVersionAndPlatform({
          newVersion: versionContext,
          newPlatform: selectedPlatform,
          functionName: functionObject ? functionObject.name : "",
          versionList,
          snowflakeVersions,
        });
      } else {
        // Just set the widget to the selected platform but dont navigate anywhere.
        // The user should pick a version first.
        setWidgetPlatform(selectedPlatform);
      }
    },
    [functionObject, versionList, snowflakeVersions],
  );

  const handleSelectVersion = useCallback(
    (selectedVersion) => {
      setVersionAndPlatform({
        newVersion: selectedVersion,
        newPlatform: widgetPlatform,
        functionName: functionObject ? functionObject.name : "",
        versionList,
        snowflakeVersions,
      });
    },
    [widgetPlatform, functionObject, versionList, snowflakeVersions],
  );

  const validVersionForWidgetPlatform =
    widgetPlatform == DEFAULT_PLATFORM
      ? versionList
      : snowflakeVersions[widgetPlatform];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.VersionButton} id="selectButton">
          <i className="material-icons-sharp">keyboard_arrow_down</i>
          <span>Version {numericVersion}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.PopoverContent}
          sideOffset={5}
          align="end"
        >
          <form>
            <legend>Show exceptions for:</legend>
            <RadioGroup.Root
              className={styles.RadioGroupRoot}
              defaultValue={widgetPlatform}
              aria-label="streamlit platform"
              onValueChange={handleSelectPlatform}
            >
              {PLATFORMS.map((platform) => (
                <div key={platform.id}>
                  <RadioGroup.Item
                    className={styles.RadioGroupItem}
                    value={platform.id}
                    id={platform.id}
                  >
                    <RadioGroup.Indicator
                      className={styles.RadioGroupIndicator}
                    />
                  </RadioGroup.Item>
                  <label className={styles.RadioLabel} htmlFor={platform.id}>
                    {platform.name}
                  </label>
                </div>
              ))}
            </RadioGroup.Root>
          </form>

          <ScrollArea.Root className={styles.ScrollAreaRoot}>
            <div className={styles.FadeTop}></div>
            <ScrollArea.Viewport className={styles.ScrollAreaViewport}>
              <RadioGroup.Root
                className={styles.VersionListRoot}
                defaultValue={numericVersion}
                aria-label="streamlit version"
                onValueChange={handleSelectVersion}
              >
                {validVersionForWidgetPlatform
                  .toReversed()
                  .map((validVersion) => (
                    <div key={validVersion}>
                      <RadioGroup.Item
                        className={styles.VersionListItem}
                        value={validVersion}
                        id={validVersion}
                      >
                        <RadioGroup.Indicator
                          className={classNames(
                            "material-icons-sharp",
                            styles.VersionListIndicator,
                          )}
                        />
                      </RadioGroup.Item>
                      <label
                        className={styles.VersionLabel}
                        htmlFor={validVersion}
                      >
                        Version {validVersion}
                      </label>
                    </div>
                  ))}
              </RadioGroup.Root>
            </ScrollArea.Viewport>
            <div className={styles.FadeBottom}></div>
            <ScrollArea.Scrollbar
              className={styles.ScrollAreaScrollbar}
              orientation="vertical"
            >
              <ScrollArea.Thumb className={styles.ScrollAreaThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>

          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <i className="material-icons-sharp">close</i>
          </Popover.Close>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default VersionSelector;
