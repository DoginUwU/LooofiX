import { appWindow } from '@tauri-apps/api/window';

const setAlwaysOnTop = (value: boolean) => {
  appWindow.setAlwaysOnTop(value);
};

export { setAlwaysOnTop };
