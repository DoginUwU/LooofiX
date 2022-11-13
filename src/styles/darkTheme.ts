import { ITheme } from "@/@types/theme";

const THEME: ITheme = {
  primary: "#71B8EF",
  secondary: "#AAEDF2",
  bgPrimary: "#383838",
  bgSecondary: "#000",
};

const darkTheme = () => {
  import("./dark.theme.scss");
  return THEME;
};

export default darkTheme;
