import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";

import darkTheme from "@/styles/darkTheme";
import lightTheme from "@/styles/lightTheme";

import { AvailableThemes, ITheme } from "@/@types/theme";
import { SyncWindows } from "@/utils/syncWindows";
import { useSettings } from "./SettingsContext";


interface IThemeContext {
  theme: ITheme;
  themeString: AvailableThemes;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { settings } = useSettings();
  const [themeString, setThemeString] = useState<AvailableThemes>(settings.appearance.theme);
  const theme = themeString === "light" ? lightTheme : darkTheme;

  const handleTheme = (theme: AvailableThemes, __syncCall?: boolean) => {
    setThemeString(theme);
    const app = document.getElementById("root");
    if(theme === "light") {
      app?.classList.remove("theme-dark");
    } else {
      app?.classList.add("theme-dark");
    }

    if (!__syncCall) SyncWindows.send("handleTheme", theme);
  }

  useEffect(() => {
    handleTheme(settings.appearance.theme);
  }, [settings.appearance.theme]);

  return (
      <ThemeContext.Provider value={{ theme, themeString }}>
          {children}
      </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a YoutubeProvider');
  }

  return context;
};

export { ThemeProvider, useTheme };
