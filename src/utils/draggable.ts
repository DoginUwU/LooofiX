import { ipcRenderer } from "electron";

let wX: number;
let wY: number;
let dragging: boolean = false;

const createDrag = () => {
  const draggable = document.getElementById("draggable");

  if (!draggable) return;

  draggable.onmousedown = (e) => {
    dragging = true;
    wX = e.pageX;
    wY = e.pageY;
  };
  draggable.onmouseup = (e) => {
    dragging = false;
  };

  window.onmousemove = (e) => {
    if (dragging) {
      const xLoc = e.screenX - wX;
      const yLoc = e.screenY - wY;

      ipcRenderer.invoke("move-win", xLoc, yLoc);
    }
  };
};

export { createDrag };
