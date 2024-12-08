import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [sourceFile, setSourceFile] = useState(null); // TODO: Move out of context?

  return (
    <AppContext.Provider
      value={{
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
