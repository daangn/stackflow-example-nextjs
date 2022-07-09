import React, { createContext, useContext, useEffect, useState } from "react";

const AppScreenThemeContext = createContext<
  "android" | "cupertino" | undefined
>(undefined);

export const useAppScreenTheme = () => useContext(AppScreenThemeContext);

interface AppScreenThemeProviderProps {
  children: React.ReactNode;
}
export const AppScreenThemeProvider: React.FC<AppScreenThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"android" | "cupertino" | undefined>(
    undefined,
  );

  useEffect(() => {
    const isCupertino = /iphone|ipad|ipod/i.test(
      navigator.userAgent.toLowerCase(),
    );
    setTheme(isCupertino ? "cupertino" : "android");
  }, [setTheme]);

  return (
    <AppScreenThemeContext.Provider value={theme}>
      {children}
    </AppScreenThemeContext.Provider>
  );
};
