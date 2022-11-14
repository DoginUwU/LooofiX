import { ITheme } from "@/@types/theme";
import { Wave } from "@/utils/WaveJS";
import Color from "color";

class AudioWavesHelper {
  public wave: Wave;

  constructor(
    private canvas?: HTMLCanvasElement,
    private video?: HTMLVideoElement,
    private theme?: ITheme
  ) {
    if (!this.canvas) {
      throw new Error("No canvas element provided");
    }
    if (!this.video) {
      throw new Error("No video element provided");
    }

    this.wave = new Wave(this.video, this.canvas);

    this.createAnimations();

    // ipcRenderer.on("blur", () => {
    //   this.blur();
    // });
    // ipcRenderer.on("focus", () => {
    //   this.unblur();
    // });
  }

  public createAnimations() {
    this.wave.addAnimation(
      new this.wave.animations.Wave({
        fillColor: this.theme?.secondary,
        lineColor: "transparent",
        rounded: true,
        count: 20,
        frequencyBand: "base",
      })
    );
    this.wave.addAnimation(
      new this.wave.animations.Wave({
        fillColor: Color(this.theme?.primary).alpha(0.5).hsl().string(),
        lineColor: "transparent",
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

  public setTheme(theme: ITheme) {
    this.theme = theme;
    this.wave.clearAnimations();
    this.createAnimations();
  }
}

export { AudioWavesHelper };
