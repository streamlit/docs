import { createContext, useContext, useState } from "react";

const context = createContext();

export const DEFAULT_VERSION = null; // Latest
export const DEFAULT_PLATFORM = "oss";

export function VersionContextProvider({ children }) {
  const [version, setVersionState] = useState(null);
  const [platform, setPlatformState] = useState(null);

  const setVersionAndPlatform = useCallback(
    (
      newVersion,
      newPlatform,
      versionFromStaticLoad = null,
      versions = [],
      currMenuItem = null,
    ) => {
      if (
        !versionAndPlatformAreCompatible(newVersion, newPlatform /* stuff */)
      ) {
        console.error(
          "Incompatible version and platform:",
          newVersion,
          newPlatform,
        );
        return;
      }

      const versionOrNull = setToNullIfLatestVersion(/* stuff */);
      setVersionState(versionOrNull);

      const cleanedPlatform = newPlatorm ?? DEFAULT_PLATFORM;
      setPlatformState(cleanedPlatform);

      updateUrl(versionOrNull, cleanedPlatform, currMenuItem.isVersioned);
    },
    [],
  );

  return (
    <AppContext.Provider
      value={{
        version,
        platform,
        setVersionAndPlatform,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useVersion() {
  return useContext(context);
}

const { version, platform, setVersionAndPlatform } = useVersion();
