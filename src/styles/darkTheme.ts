import { ITheme } from "@/@types/theme";

const THEME: ITheme = {
  primary: "#023e8a",
  secondary: "#0096c7",
  bgPrimary: "#383838",
  bgSecondary: "#000",
};

const darkTheme = () => {
  import("./dark.theme.scss");
  return THEME;
};

export default darkTheme;
