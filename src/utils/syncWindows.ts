import { ipcRenderer } from "electron";

type ISync = [string, any[]];

interface IContexts {
  [key: string]: any;
}

class SyncWindows {
  private functions: Array<IContexts> = [];
  public static instance: SyncWindows;

  constructor(...functions: Array<IContexts>) {
    if (SyncWindows.instance) return;
    console.log("[SYNC] initialized on new Window");

    SyncWindows.instance = this;
    this.functions = functions;

    ipcRenderer.invoke("get-sync-history").then((history: ISync[]) => {
      history.forEach(([functionName, ...args]) => {
        this.sync(functionName, ...args);
        console.log("[SYNC] GET 1", functionName, ...args);
      });
    });

    ipcRenderer.on("sync-internal", (_, functionName, ...args) => {
      this.sync(functionName, ...args);
      console.log("[SYNC] GET 2", functionName, ...args);
    });
  }

  public sync(functionName: string, ...args: any) {
    this.functions.forEach((funcs) => {
      if (funcs.hasOwnProperty(functionName)) {
        if (typeof funcs[functionName] === "function") {
          funcs[functionName](...args, true);
        }
      }
    });
  }

  public static send(functionName: string, ...args: any) {
    ipcRenderer.send("sync", functionName, ...args);
    console.log("[SYNC] send", functionName, ...args);
  }
}

export { SyncWindows };
