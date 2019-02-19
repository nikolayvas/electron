import { Injectable } from "@angular/core";
import { IpcRenderer } from "electron";

@Injectable({
  providedIn: "root"
})
export class FileService {
  private ipc: IpcRenderer;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require("electron").ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn("Could not load electron ipc");
    }
    
    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const startAsync = async callback => {
      await wait(1000);
      callback('Hello');
      await wait(1000);
      callback('And Welcome');
      await wait(1000);
      callback('To Async Await Using TypeScript');
    };

  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.once("getFilesResponse", (event, arg) => {
        resolve(arg);
      });
      this.ipc.send("getFiles");
    });
  }

  
}

