import { ISettings } from "@/@types/settings";
import { ITheme } from "@/@types/theme";
import { Wave } from "@/utils/WaveJS";
import Color from "color";
import { ipcRenderer } from "electron";

class AudioWavesHelper {
  public wave: Wave;
  public isBlurred: boolean = false;

  constructor(
    private canvas?: HTMLCanvasElement,
    private audio?: HTMLAudioElement,
    private theme?: ITheme,
    private settings?: ISettings
  ) {
    if (!this.canvas) {
      throw new Error("No canvas element provided");
    }
    if (!this.audio) {
      throw new Error("No audio element provided");
    }

    this.wave = new Wave(this.audio, this.canvas);

    this.createAnimations();

    ipcRenderer.on("blur", () => {
      this.blur();
    });
    ipcRenderer.on("focus", () => {
      this.unblur();
    });
    ipcRenderer.on("hide", () => {
      this.blur();
    });
    ipcRenderer.on("show", () => {
      this.unblur();
    });
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
    if (!this.settings) return;
    const { disableWavesOnBlur, disableWavesOnMinimize } =
      this.settings.behaviours;
    if (!disableWavesOnBlur || !disableWavesOnMinimize) return;
    if (!this.canvas) return;

    this.wave.clearAnimations();

    this.canvas.style.display = "none";
    this.isBlurred = true;
  }

  public unblur() {
    if (!this.canvas || !this.isBlurred) return;

    this.canvas.style.display = "block";
    this.createAnimations();
  }

  public setTheme(theme: ITheme) {
    this.theme = theme;
    this.wave.clearAnimations();
    this.createAnimations();
  }

  public setSettings(settings: ISettings) {
    this.settings = settings;

    if (this.settings.behaviours.disableWavesOnBlur) {
      this.blur();
    } else {
      this.unblur();
    }
  }
}

export { AudioWavesHelper };
