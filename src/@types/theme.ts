interface ITheme {
  primary: string;
  secondary: string;
  bgPrimary: string;
  bgSecondary: string;
}

type AvailableThemes = "light" | "dark";

export type { ITheme, AvailableThemes };
