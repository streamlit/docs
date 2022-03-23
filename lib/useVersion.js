import { useState, useEffect } from "react";

import { useAppContext } from "../context/AppContext";

const useVersion = (versionFromStaticLoad = null, versions = [], currMenuItem = null) => {
  const maxVersion = versions[versions.length - 1];

  const { version, setVersion } = useAppContext();

  if (currMenuItem && currMenuItem.isVersioned && versionFromStaticLoad) {
    setVersion(
      versionFromStaticLoad === maxVersion ? null : versionFromStaticLoad);
  }

  useEffect(() => {
    if (!currMenuItem || !currMenuItem.isVersioned) {
      return;
    }

    if (versionFromStaticLoad === maxVersion) {
      setVersion(null);
    } else {
      setVersion(versionFromStaticLoad);
    }
  }, [versionFromStaticLoad]);

  return version;
}

export default useVersion;
