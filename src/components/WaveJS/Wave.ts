import { IPolygonOptions, IAnimation } from "./types";
import { Shapes } from "./Shapes";
import { AudioData } from "./AudioData";

/**
 * @source
 */
export interface IWaveOptions extends IPolygonOptions {
  count?: number;
  frequencyBand?: "base" | "lows" | "mids" | "highs";
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  center?: boolean;
  mirroredX?: boolean;
  mirroredY?: boolean;
}

/**
 * These are the options for the Wave animation [[IWaveOptions]]
 */
export class Wave implements IAnimation {
  private _options: IWaveOptions;

  constructor(options?: IWaveOptions) {
    this._options = options ?? {};
  }

  public draw(
    audioBufferData: Uint8Array,
    canvas: CanvasRenderingContext2D
  ): void {
    const { height, width } = canvas.canvas;
    const audioData = new AudioData(audioBufferData);
    const shapes = new Shapes(canvas);
    this._options = {
      count: 64,
      frequencyBand: "mids",
      ...this._options,
    };

    if (this._options.frequencyBand)
      audioData.setFrequencyBand(this._options.frequencyBand);
    audioData.scaleData(Math.min(width, height));

    if (this._options.mirroredX) {
      let n = 1;
      for (
        let i = Math.ceil(audioData.data.length / 2);
        i < audioData.data.length;
        i++
      ) {
        audioData.data[i] =
          audioData.data[Math.ceil(audioData.data.length / 2) - n];
        n++;
      }
    }

    let points: { x: number; y: number }[] = [{ x: 0, y: height }];
    for (let i = 0; i <= this._options.count!; i++) {
      let dataIndex =
        Math.floor(audioData.data.length / this._options.count!) * i;
      let dataValue = audioData.data[dataIndex];
      points.push({
        x: Math.floor(width / this._options.count!) * i,
        y: height - dataValue,
      });
    }
    points.push({ x: width, y: height });
    shapes.polygon(points, this._options);
  }
}
