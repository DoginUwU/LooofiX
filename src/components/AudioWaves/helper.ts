import { Wave } from "@/utils/WaveJS";

class AudioWavesHelper {
  public wave: Wave;

  constructor(canvas?: HTMLCanvasElement, video?: HTMLVideoElement) {
    if (!canvas) {
      throw new Error("No canvas element provided");
    }
    if (!video) {
      throw new Error("No video element provided");
    }

    this.wave = new Wave(video, canvas);

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

  public init() {}
}

export { AudioWavesHelper };
