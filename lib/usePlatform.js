import { useState, useEffect } from "react";

import { useAppContext } from "../context/AppContext";

const usePlatform = (selected = null) => {
  const { platform, setPlatform } = useAppContext();
  setPlatform(selected);

  return platform;
};

export default usePlatform;
