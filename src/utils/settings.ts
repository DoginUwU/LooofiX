import { ISettings } from "@/@types/settings";
import { store } from "./store";

const setSettings = async (settings: ISettings) => {
  await store.set("settings", settings);
};

const getSettings = async (): Promise<ISettings | null> => {
  return store.get<ISettings>("settings");
};

export { setSettings, getSettings };
