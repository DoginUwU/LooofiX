import { ipcRenderer } from "electron";

type IFunction = [(...args: any) => any, string];
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
    this.functions.forEach(([func, name]) => {
      if (name === functionName) {
        func(...args);
      }
    });
  }

  public static send(functionName: string, ...args: any) {
    if (
      SyncWindows.instance?.functions.some(([_, name]) => name === functionName)
    ) {
      return;
    }

    ipcRenderer.send("sync", functionName, ...args);
    console.log("[SYNC] send", functionName, ...args);
  }
}

export { SyncWindows };
