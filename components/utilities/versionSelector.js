import React, { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import styles from "./versionSelector.module.css";
import useVersion from "../../lib/useVersion";
import usePlatform from "../../lib/usePlatform";

const PLATFORMS = [
  { id: "oss", name: "None" },
  { id: "sis", name: "Streamlit in Snowflake" },
  { id: "na", name: "Native Apps" },
];

const VersionSelector = ({
  versionList,
  snowflakeVersions,
  currentVersion,
  handleSelectVersion,
}) => {
  const [currentPlatform, setCurrentPlatform] = useState("oss");
  const handleSelectPlatform = (event) => {
    setCurrentPlatform(event); // Replace with context
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.VersionButton} id="selectButton">
          <i className="material-icons-sharp">keyboard_arrow_down</i>
          <span>Version {currentVersion}</span>
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
              defaultValue={null}
              aria-label="streamlit platform"
              onValueChange={handleSelectPlatform}
            >
              {PLATFORMS.map((platform) => (
                <div>
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
                defaultValue={currentVersion}
                aria-label="streamlit version"
                onValueChange={handleSelectVersion}
              >
                {currentPlatform !== null && currentPlatform !== undefined
                  ? snowflakeVersions["sis"].map((sf_version) => (
                      <div>
                        <RadioGroup.Item
                          className={styles.VersionListItem}
                          value={sf_version}
                          id={sf_version}
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
                          htmlFor={sf_version}
                        >
                          Version {sf_version}
                        </label>
                      </div>
                    ))
                  : versionList.map((oss_version) => (
                      <div>
                        <RadioGroup.Item
                          className={styles.VersionListItem}
                          value={oss_version}
                          id={oss_version}
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
                          htmlFor={oss_version}
                        >
                          Version {oss_version}
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
