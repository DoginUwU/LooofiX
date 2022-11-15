import { AvailableThemes } from "./theme";

interface IAppearanceSettings {
  theme: AvailableThemes;
  player: {
    onlyShowTitleOnHover: boolean;
    onlyShowControlsOnHover: boolean;
  };
}

interface IBehavioursSettings {
  alwaysOnTop: boolean;
  disableWavesOnBlur: boolean;
  disableWavesOnMinimize: boolean;
}

interface ISettings {
  appearance: IAppearanceSettings;
  behaviours: IBehavioursSettings;
}

export type { ISettings, IAppearanceSettings };
