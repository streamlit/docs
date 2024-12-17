import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
import { functionNameToAnchorName } from "../lib/utils";
import { getLatest } from "../lib/api";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Context = createContext();

export const DEFAULT_VERSION = "latest";
export const DEFAULT_PLATFORM = "oss";
const VERSIONS_LIST = publicRuntimeConfig.VERSIONS_LIST;
const LATEST_OSS_VERSION = publicRuntimeConfig.LATEST_OSS_VERSION;
const PLATFORM_VERSIONS = publicRuntimeConfig.PLATFORM_VERSIONS;
const PLATFORM_LATEST_VERSIONS = publicRuntimeConfig.PLATFORM_LATEST_VERSIONS;
const PLATFORMS = publicRuntimeConfig.PLATFORMS;

export function VersionContextProvider({ children }) {
  const [initialized, setInitialized] = useState(false);

  const [version, setVersionState] = useState(DEFAULT_VERSION);
  const [platform, setPlatformState] = useState(DEFAULT_PLATFORM);
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const initialize = useCallback(
    ({ newVersion, newPlatform, functionName = null, currMenuItem = null }) => {
      if (initialized) return [version, platform];

      setVersionAndPlatform({
        newVersion,
        newPlatform,
        functionName,
        currMenuItem,
        updateURL: true,
      });

      setInitialized(true);

      return [newVersion, newPlatform];
    },
    [initialized, version, platform],
  );

  const setVersionAndPlatform = useCallback(
    ({
      newVersion,
      newPlatform,
      functionName = null,
      currMenuItem = null,
      updateURL = true,
    }) => {
      if (!versionAndPlatformAreCompatible(newVersion, newPlatform)) {
        console.error(
          "Incompatible version and platform:",
          newVersion,
          newPlatform,
        );
        return;
      }

      if (currMenuItem && !currMenuItem.isVersioned) {
        return;
      }

      const cleanedVersion = isLatestVersion(newVersion, newPlatform)
        ? DEFAULT_VERSION
        : newVersion;
      setVersionState(cleanedVersion);

      const cleanedPlatform = newPlatform ?? DEFAULT_PLATFORM;
      setPlatformState(cleanedPlatform);

      if (updateURL) {
        updateUrlWithVersionAndPlatformIfNeeded({
          router,
          newVersion: cleanedVersion,
          newPlatform: cleanedPlatform,
          functionName,
        });
      }
    },
    [router, version, platform],
  );

  function goToLatest() {
    setVersionState(DEFAULT_VERSION);
  }

  function goToOpenSource() {
    setPlatformState(DEFAULT_PLATFORM);
  }

  return (
    <Context.Provider
      value={{
        version,
        platform,
        initialize,
        setVersionAndPlatform,
        goToLatest,
        goToOpenSource,
        // isOpen,
        // setIsOpen
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useVersion() {
  return useContext(Context);
}

export function isLatestVersion(version, platform) {
  const maxVersion =
    platform == DEFAULT_PLATFORM
      ? LATEST_OSS_VERSION
      : PLATFORM_LATEST_VERSIONS[platform];

  return version == DEFAULT_VERSION || version == maxVersion;
}

export function updateUrlWithVersionAndPlatformIfNeeded({
  router,
  newVersion,
  newPlatform,
  functionName,
}) {
  const urlParts = router.asPath.split("#")[0].split("/");
  urlParts.shift(); // Remove spare item that comes from the trailing slash.

  const hashStr = functionName
    ? `#${functionNameToAnchorName(functionName)}`
    : "";

  const [versionFromSlug, platformFromSlug] = looksLikeVersionAndPlatformString(
    urlParts[0],
  )
    ? getVersionAndPlatformFromPathPart(urlParts[0])
    : [DEFAULT_VERSION, DEFAULT_PLATFORM];

  if (versionFromSlug == newVersion && platformFromSlug == newPlatform) {
    // Nothing to do.
    return;
  }

  // Remove version from urlParts (because we'll re-add later).
  if (
    versionFromSlug != DEFAULT_VERSION ||
    platformFromSlug != DEFAULT_PLATFORM
  ) {
    urlParts.shift();
  }

  const versionAndPlatformStr = getVersionAndPlatformStr(
    newVersion,
    newPlatform,
  );

  if (versionAndPlatformStr != null) {
    urlParts.unshift(versionAndPlatformStr);
  }

  // Update URL.
  router.push(`/${urlParts.join("/")}${hashStr}`);
}

export function getVersionAndPlatformStr(version, platform) {
  if (version == DEFAULT_VERSION) {
    if (platform == DEFAULT_PLATFORM) {
      return null;
    }

    return `${DEFAULT_VERSION}-${platform}`;
  }

  if (platform == DEFAULT_PLATFORM) {
    return version;
  }

  return `${version}-${platform}`;
}

export function looksLikeVersionAndPlatformString(urlPart) {
  const platforms = [DEFAULT_PLATFORM].concat(
    Object.keys(publicRuntimeConfig.PLATFORM_VERSIONS),
  );

  // docs.streamlit.io/1.23.0/path1/path2
  const isPureVersion = /^[\d\.]+$/.test(urlPart);
  if (isPureVersion) return true;

  // docs.streamlit.io/1.23.0-sis/path1/path2
  const versionPlatformRegex = RegExp(`^[\\d\\.]+-(${platforms.join("|")})$`);
  const isVersionWithPlatform = versionPlatformRegex.test(urlPart);
  if (isVersionWithPlatform) return true;

  // docs.streamlit.io/latest-sis/path1/path2
  const latestPlatformRegex = RegExp(`^latest-(${platforms.join("|")})$`);
  const isLatestPlatform = latestPlatformRegex.test(urlPart);
  if (isLatestPlatform) return true;

  return false;
}

export function getVersionAndPlatformFromPathPart(pathPart) {
  if (!looksLikeVersionAndPlatformString(pathPart)) {
    return [DEFAULT_VERSION, DEFAULT_PLATFORM];
  }

  const [version, platform] = pathPart.split("-");
  const cleanedPlatform = platform ?? DEFAULT_PLATFORM;

  return [version, cleanedPlatform];
}

export function versionAndPlatformAreCompatible(version, platform) {
  if (version == DEFAULT_VERSION) return true;

  if (platform == DEFAULT_PLATFORM && VERSIONS_LIST.indexOf(version) >= 0) {
    return true;
  }

  return PLATFORM_VERSIONS[platform].indexOf(version) >= 0;
}

export function getBestNumericVersion(version, platform) {
  if (version == DEFAULT_VERSION) {
    if (PLATFORM_VERSIONS[platform]) {
      // This is a valid platform so return the latest version in the platform.
      return [PLATFORM_LATEST_VERSIONS[platform], platform];
    } else {
      // This is an invalid platform so we return the latest version for OSS.
      return [LATEST_OSS_VERSION, DEFAULT_PLATFORM];
    }
  } else {
    if (versionAndPlatformAreCompatible(version, platform)) {
      // This is a numeric version that is compatible with the platform. Return it all back.
      return [version, platform];
    } else {
      if (PLATFORM_VERSIONS[platform]) {
        // Version and platform are incompatible, but platform exists. So return the latest
        // for the platform.
        return [PLATFORM_LATEST_VERSIONS[platform], platform];
      } else {
        // Version and platform are incompatible, and platform does not exist. So return the
        // latest for OSS.
        return [LATEST_OSS_VERSION, DEFAULT_PLATFORM];
      }
    }
  }
}
