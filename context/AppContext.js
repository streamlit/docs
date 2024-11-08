import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [version, setVersion] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);

  return (
    <AppContext.Provider
      value={{
        version,
        setVersion,
        platform,
        setPlatform,
        sourceFile,
        setSourceFile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
