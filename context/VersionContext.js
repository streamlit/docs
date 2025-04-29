import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const VersionContext = createContext();

const DEFAULT_VERSION = publicRuntimeConfig.DEFAULT_VERSION;
const DEFAULT_PLATFORM = publicRuntimeConfig.DEFAULT_PLATFORM;
const VERSIONS_LIST = publicRuntimeConfig.VERSIONS_LIST;
const LATEST_VERSION = publicRuntimeConfig.LATEST_VERSION;
const PLATFORM_VERSIONS = publicRuntimeConfig.PLATFORM_VERSIONS;
const PLATFORM_LATEST_VERSIONS = publicRuntimeConfig.PLATFORM_LATEST_VERSIONS;
const PLATFORMS = publicRuntimeConfig.PLATFORMS;

export function VersionContextProvider(props) {
  const [platform, setPlatform] = useState(
    () => props.platformFromSlug ?? DEFAULT_PLATFORM, // Init: Platform from slug, else "oss"
  );
  const [version, setVersion] = useState(
    () => props.versionFromSlug ?? DEFAULT_VERSION, // Init: Version from slug, else "latest"
  );

  useEffect(() => {
    if (props.versionFromSlug || props.platformFromSlug) {
      setVersion(props.versionFromSlug);
      setPlatform(props.platformFromSlug);
    }
  }, [props.versionFromSlug, props.platformFromSlug]);

  const goToLatest = useCallback(() => {
    setVersion(DEFAULT_VERSION);
  }, []);

  const goToOpenSource = useCallback(() => {
    setPlatform(DEFAULT_PLATFORM);
  }, []);

  return (
    <VersionContext.Provider
      value={{ version, platform, goToLatest, goToOpenSource }}
    >
      {props.children}
    </VersionContext.Provider>
  );
}

export function useVersionContext() {
  return useContext(VersionContext);
}

export function looksLikeVersionAndPlatformString(urlPart) {
  const platforms = [DEFAULT_PLATFORM].concat(Object.keys(PLATFORM_VERSIONS));

  // docs.streamlit.io/1.23.0/path1/path2
  const isPureVersion = /^[\d\.]+$/.test(urlPart);
  if (isPureVersion) return true;

  // docs.streamlit.io/latest/path1/path2
  const isLatestVersion = urlPart == "latest";
  if (isLatestVersion) return true;

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
    return [null, null];
  }

  const [version, platform] = pathPart.split("-");
  const cleanedPlatform = platform ?? DEFAULT_PLATFORM;

  return [version, cleanedPlatform];
}

export function getVersionAndPlatformString(version, platform) {
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
