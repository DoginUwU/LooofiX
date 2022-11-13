import { Wave } from "@/utils/WaveJS";
import { ipcRenderer } from "electron";

class AudioWavesHelper {
  public wave: Wave;

  constructor(
    private canvas?: HTMLCanvasElement,
    private video?: HTMLVideoElement
  ) {
    if (!this.canvas) {
      throw new Error("No canvas element provided");
    }
    if (!this.video) {
      throw new Error("No video element provided");
    }

    this.wave = new Wave(this.video, this.canvas);

    this.createAnimations();

    ipcRenderer.on("blur", () => {
      this.blur();
    });
    ipcRenderer.on("focus", () => {
      this.unblur();
    });
  }

  public createAnimations() {
    this.wave.addAnimation(
      new this.wave.animations.Wave({
        fillColor: "#AAEDF2",
        lineColor: "#94E1E7",
        rounded: true,
        count: 20,
        frequencyBand: "base",
      })
    );
    this.wave.addAnimation(
      new this.wave.animations.Wave({
        fillColor: "rgba(113, 184, 239, 0.5)",
        lineColor: "#71B8EF",
        rounded: true,
        count: 20,
        frequencyBand: "lows",
      })
    );
  }

  public blur() {
    this.wave.clearAnimations();

    if (!this.canvas) return;

    this.canvas.style.display = "none";
  }

  public unblur() {
    if (!this.canvas) return;

    this.canvas.style.display = "block";
    this.createAnimations();
  }
}

export { AudioWavesHelper };
