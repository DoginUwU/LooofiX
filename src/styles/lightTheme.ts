import { ITheme } from "@/@types/theme";
import "./light.theme.scss";

const THEME: ITheme = {
  primary: "#71B8EF",
  secondary: "#AAEDF2",
  bgPrimary: "#fff",
  bgSecondary: "#000",
};

const darkTheme = () => {
  import("./light.theme.scss");
  return THEME;
};

export default darkTheme;
