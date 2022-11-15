import { ISettings } from "@/@types/settings";

const DEFAULT_SETTINGS: ISettings = {
  appearance: {
    theme: "dark",
    player: {
      onlyShowControlsOnHover: false,
      onlyShowTitleOnHover: false,
    },
  },
  behaviours: {
    alwaysOnTop: false,
  },
};

export { DEFAULT_SETTINGS };
