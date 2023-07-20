import { invoke } from "@tauri-apps/api";
import { listen } from '@tauri-apps/api/event'

interface IContexts {
  [key: string]: any;
}

class SyncWindows {
  private winId: string = "";
  private functions: Array<IContexts> = [];

  constructor() {
    this.winId = Math.random().toString(36)

    console.log("[SYNC] initialized on new Window ID: ", this.winId);

    listen("sync-internal", (event) => {
      const payload = event.payload;
      if(!payload || !(payload instanceof Array)) return;

      const [winId, functionName, ...args] = payload;

      if(this.winId === winId) return;

      this.sync(functionName, ...args);
      console.log("[SYNC] GET 2", functionName, ...args);
    })
  }

  public addFunctions(...functions: Array<IContexts>) {
    this.functions.push(...functions);
  }

  public sync(functionName: string, ...args: any) {
    this.functions.forEach((funcs) => {
      if (funcs.hasOwnProperty(functionName)) {
        if (typeof funcs[functionName] === "function") {
          funcs[functionName](...args);
        }
      }
    });
  }

  public send(functionName: string, ...args: any) {
    invoke("sync", { winId: this.winId, fnName: functionName, args })
    console.log("[SYNC] send", this.winId, functionName, ...args);
  }
}

const singleton = new SyncWindows();
Object.freeze(singleton);

export default singleton;
