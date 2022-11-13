import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";

import darkTheme from "@/styles/darkTheme";
import lightTheme from "@/styles/lightTheme";

import { ITheme } from "@/@types/theme";
import { SyncWindows } from "@/utils/syncWindows";

type AvailableThemes = 'light' | 'dark';

interface IThemeContext {
  theme: ITheme;
  handleTheme: (theme: AvailableThemes) => void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [themeString, setThemeString] = useState<AvailableThemes>("light");
  const theme = themeString === "light" ? lightTheme() : darkTheme();

  const handleTheme = (theme: AvailableThemes, __syncCall?: boolean) => {
    setThemeString(theme);

    if (!__syncCall) SyncWindows.send("handleTheme", theme);
  }

  return (
      <ThemeContext.Provider value={{ theme, handleTheme }}>
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
