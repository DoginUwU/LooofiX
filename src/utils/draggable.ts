import { appWindow, LogicalPosition } from '@tauri-apps/api/window';

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

      appWindow.setPosition(new LogicalPosition(xLoc, yLoc))
    }
  };
};

export { createDrag };
