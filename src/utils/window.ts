import { ipcRenderer } from "electron";

const createNewWindow = async () => {
  ipcRenderer.invoke("open-win", "settings");
};

const closeWindow = (winId?: number) => {
  ipcRenderer.invoke("close-win", winId);
};

export { createNewWindow, closeWindow };
