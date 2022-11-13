import { ipcRenderer } from "electron";

const createNewWindow = () => {
  ipcRenderer.invoke("open-win", "settings");
};

export { createNewWindow };
