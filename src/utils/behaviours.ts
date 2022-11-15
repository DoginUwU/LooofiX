import { ipcRenderer } from "electron";

const setAlwaysOnTop = (value: boolean) => {
  ipcRenderer.invoke("set-always-on-top", value);
};

export { setAlwaysOnTop };
