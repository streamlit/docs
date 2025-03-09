import React, { useState, useEffect, useCallback } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import styles from "./versionSelector.module.css";
import {
  useVersion,
  DEFAULT_PLATFORM,
  getBestNumericVersion,
} from "../../context/VersionContext";

const VERSIONS_LIST = publicRuntimeConfig.VERSIONS_LIST;
const LATEST_OSS_VERSION = publicRuntimeConfig.LATEST_OSS_VERSION;
const PLATFORM_VERSIONS = publicRuntimeConfig.PLATFORM_VERSIONS;
const PLATFORM_LATEST_VERSIONS = publicRuntimeConfig.PLATFORM_LATEST_VERSIONS;
const PLATFORMS = publicRuntimeConfig.PLATFORMS;

const VersionSelector = ({
  functionObject, // For anchor link to jump back to function upon version change
}) => {
  const {
    version: versionContext,
    platform: platformContext,
    setVersionAndPlatform,
  } = useVersion();

  const [numericVersion, compatiblePlatform] = getBestNumericVersion(
    versionContext,
    platformContext,
  );

  const [widgetPlatform, setWidgetPlatform] = useState(compatiblePlatform);
  const handleSelectPlatform = useCallback(
    (selectedPlatform) => {
      setWidgetPlatform(selectedPlatform);
    },
    [functionObject],
  );

  const handleSelectVersion = useCallback(
    (selectedVersion) => {
      setVersionAndPlatform({
        newVersion: selectedVersion,
        newPlatform: widgetPlatform,
        functionName: functionObject ? functionObject.name : "",
      });
    },
    [widgetPlatform, functionObject],
  );

  const validVersionForWidgetPlatform =
    widgetPlatform == DEFAULT_PLATFORM
      ? VERSIONS_LIST
      : PLATFORM_VERSIONS[widgetPlatform];

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
          <Tabs.Root
            className={styles.TabsRoot}
            defaultValue={widgetPlatform}
            orientation="vertical"
            onValueChange={handleSelectPlatform}
          >
            <Tabs.List className={styles.TabsList} aria-label="Platform">
              <p className={styles.TabsTitle}>Versions by platform:</p>
              {Object.keys(PLATFORMS).map((availablePlatform) => (
                <Tabs.Trigger
                  className={styles.TabsTrigger}
                  value={availablePlatform}
                >
                  {PLATFORMS[availablePlatform]}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {Object.keys(PLATFORMS).map((availablePlatform) => (
              <Tabs.Content
                className={styles.TabsContent}
                value={availablePlatform}
              >
                <ScrollArea.Root className={styles.ScrollAreaRoot}>
                  <div className={styles.FadeTop}></div>
                  <ScrollArea.Viewport className={styles.ScrollAreaViewport}>
                    <RadioGroup.Root
                      className={styles.VersionListRoot}
                      defaultValue={
                        availablePlatform == platformContext
                          ? numericVersion
                          : null
                      }
                      aria-label="streamlit version"
                      onValueChange={handleSelectVersion}
                    >
                      {(PLATFORM_VERSIONS[availablePlatform] ?? VERSIONS_LIST)
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
              </Tabs.Content>
            ))}
          </Tabs.Root>
          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <i className="material-icons-sharp">close</i>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default VersionSelector;
