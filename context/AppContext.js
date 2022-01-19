import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [version, setVersion] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);

  return (
    <AppContext.Provider
      value={{ version, setVersion, sourceFile, setSourceFile }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
