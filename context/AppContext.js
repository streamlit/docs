import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [version, setVersion] = useState(null);

  return (
    <AppContext.Provider value={{ version, setVersion }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
