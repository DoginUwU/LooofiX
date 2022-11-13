import { ipcRenderer } from "electron";

type IFunction = [string, (...args: any) => any];
type ISync = [string, any[]];

class SyncWindows {
  private functions: Array<IFunction> = [];
  public static instance: SyncWindows;

  constructor(...functions: Array<IFunction>) {
    if (SyncWindows.instance) return;
    console.log("[SYNC] initialized on new Window");

    SyncWindows.instance = this;
    this.functions = functions;

    ipcRenderer.invoke("get-sync-history").then((history: ISync[]) => {
      console.log(history.length);
      history.forEach(([functionName, ...args]) => {
        this.sync(functionName, ...args);
        console.log("[SYNC] GET", functionName, ...args);
      });
    });

    ipcRenderer.on("sync", (_, functionName, ...args) => {
      this.sync(functionName, ...args);
      console.log("[SYNC] GET", functionName, ...args);
    });
  }

  public sync(functionName: string, ...args: any) {
    this.functions.forEach(([name, func]) => {
      if (name === functionName) {
        func(...args);
      }
    });
  }

  public static send(functionName: string, ...args: any) {
    ipcRenderer.send("sync", functionName, ...args);
    console.log("[SYNC] send", functionName, ...args);
  }
}

export { SyncWindows };
