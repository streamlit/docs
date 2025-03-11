import { useState, useEffect } from "react";

import { useAppContext } from "../context/AppContext";

const useVersion = (
  versionFromSlug = null,
  versions = [],
  currMenuItem = null,
) => {
  const maxVersion = versions[versions.length - 1];

  const { version, setVersion } = useAppContext();

  if (currMenuItem && currMenuItem.isVersioned && versionFromSlug) {
    setVersion(versionFromSlug === maxVersion ? null : versionFromSlug);
  }

  useEffect(() => {
    if (!currMenuItem || !currMenuItem.isVersioned) {
      return;
    }

    if (versionFromSlug === maxVersion) {
      setVersion(null);
    } else {
      setVersion(versionFromSlug);
    }
  }, [versionFromSlug]);

  return version;
};

export default useVersion;
