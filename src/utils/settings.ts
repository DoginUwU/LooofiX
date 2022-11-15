import { ISettings } from "@/@types/settings";
import { ipcRenderer } from "electron";

const setSettings = (settings: ISettings) => {
  ipcRenderer.invoke("save-settings", settings);
};

const getSettings = async (): Promise<ISettings | null> => {
  return ipcRenderer.invoke("get-settings");
};

export { setSettings, getSettings };
