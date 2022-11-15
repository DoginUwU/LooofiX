import { AvailableThemes } from "./theme";

interface IAppearanceSettings {
  theme: AvailableThemes;
  player: {
    onlyShowTitleOnHover: boolean;
    onlyShowControlsOnHover: boolean;
  };
}

interface ISettings {
  appearance: IAppearanceSettings;
}

export type { ISettings, IAppearanceSettings };
