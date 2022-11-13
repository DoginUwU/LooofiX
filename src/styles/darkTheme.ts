import { ITheme } from "@/@types/theme";

const THEME: ITheme = {
  primary: "#1a1919",
  secondary: "#262626",
  bgPrimary: "#383838",
  bgSecondary: "#000",
};

const darkTheme = () => {
  import("./dark.theme.scss");
  return THEME;
};

export default darkTheme;
