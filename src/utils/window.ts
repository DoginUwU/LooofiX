import { ipcRenderer } from "electron";

const createNewWindow = async () => {
  ipcRenderer.invoke("open-win", "/settings");
};

const closeWindow = () => {
  ipcRenderer.invoke("close-win");
};

export { createNewWindow, closeWindow };
