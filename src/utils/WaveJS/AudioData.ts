export class AudioData {
  public data: Uint8Array;

  constructor(audioBufferData: Uint8Array) {
    this.data = audioBufferData;
  }

  public setFrequencyBand(band: string) {
    const baseLength = Math.floor(this.data.length * 0.0625);
    const lowsLength = Math.floor(this.data.length * 0.0625);
    const midsLength = Math.floor(this.data.length * 0.375);

    interface IBands {
      [s: string]: Uint8Array;
    }
    const bands: IBands = {
      base: this.data.slice(0, baseLength),
      lows: this.data.slice(baseLength + 1, baseLength + lowsLength),
      mids: this.data.slice(
        baseLength + lowsLength + 1,
        baseLength + lowsLength + midsLength
      ),
      highs: this.data.slice(baseLength + lowsLength + midsLength + 1),
    };

    this.data = bands[band];
  }

  public scaleData(maxSize: number) {
    if (!(maxSize < 255)) return;

    this.data = this.data.map((value) => {
      const percent = Math.round((value / 255) * 100) / 100;
      return maxSize * percent;
    });
  }
}
