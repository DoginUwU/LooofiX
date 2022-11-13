import { ITheme } from "@/@types/theme";
import "./light.theme.scss";

const THEME: ITheme = {
  primary: "#00b4d8",
  secondary: "#90e0ef",
  bgPrimary: "#fff",
  bgSecondary: "#000",
};

const darkTheme = () => {
  import("./light.theme.scss");
  return THEME;
};

export default darkTheme;
