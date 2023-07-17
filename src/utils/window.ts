import { invoke } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";

const openSettings = async () => {
  await invoke("open_settings");
};

const closeWindow = () => {
  appWindow.close();
};

export { openSettings, closeWindow };
