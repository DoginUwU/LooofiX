import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";

import darkTheme from "@/styles/darkTheme";
import lightTheme from "@/styles/lightTheme";

import { ITheme } from "@/@types/theme";
import { SyncWindows } from "@/utils/syncWindows";

export type AvailableThemes = 'light' | 'dark';

interface IThemeContext {
  theme: ITheme;
  themeString: AvailableThemes;
  handleTheme: (theme: AvailableThemes) => void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [themeString, setThemeString] = useState<AvailableThemes>("light");
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

  return (
      <ThemeContext.Provider value={{ theme, themeString, handleTheme }}>
          {children}
      </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useYoutube must be used within a YoutubeProvider');
  }

  return context;
};

export { ThemeProvider, useTheme };
