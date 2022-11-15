// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

import { app, BrowserWindow, shell, ipcMain } from "electron";
import { release } from "os";
import { join } from "path";
import Store from "electron-store";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const store = new Store({
  name: "looofix",
});
let syncHistory = [];
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Looofix",
    icon: join(process.env.PUBLIC, "favicon.svg"),
    frame: false,
    roundedCorners: true,
    transparent: true,
    resizable: false,
    fullscreenable: false,
    width: 350,
    height: 150,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.on("blur", () => {
    win?.webContents.send("blur");
  });
  win.on("hide", () => {
    win?.webContents.send("hide");
  });
  win.on("show", () => {
    win?.webContents.send("show");
  });
  win.on("focus", () => {
    win?.webContents.send("focus");
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  const posX = store.get("position.x");
  const posY = store.get("position.y");

  if (posX && posY) {
    // @ts-ignore
    win.setPosition(posX, posY);
  }
}

app.whenReady().then(createWindow);

app.commandLine.appendSwitch("disable-site-isolation-trials");

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.handle("move-win", (_, xLoc, yLoc) => {
  BrowserWindow.getFocusedWindow().setPosition(xLoc, yLoc);
  store.set({ position: { x: xLoc, y: yLoc } });
});

// new window example arg: new windows url
ipcMain.handle("open-win", (_, route) => {
  const childWindow = new BrowserWindow({
    frame: false,
    roundedCorners: true,
    transparent: true,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: route });
  } else {
    childWindow.loadURL(`${url}${route}`);
  }

  return childWindow.id;
});

ipcMain.handle("close-win", (_) => {
  BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.handle("get-sync-history", (_) => {
  return syncHistory;
});

ipcMain.on("sync", (event, ...args) => {
  const windows = BrowserWindow.getAllWindows();
  const otherWindows = windows.filter((w) => w.id !== event.sender.id);
  otherWindows.forEach((win) => {
    win.webContents.send("sync-internal", ...args);
  });
  syncHistory = syncHistory.filter(([name]) => name !== args[0]);
  syncHistory.push(args);
});

ipcMain.handle("save-settings", (_, settings) => {
  if (!settings) return;
  store.set("settings", settings);
});
ipcMain.handle("get-settings", (_) => {
  return store.get("settings");
});

ipcMain.handle("set-always-on-top", (_, alwaysOnTop) => {
  win.setAlwaysOnTop(alwaysOnTop);
});
