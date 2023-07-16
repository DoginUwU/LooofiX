/**
 * All the code in this file is taken from the WaveJS library, which is licensed under the MIT license.
 * I only made some minor changes to the code to make it work with my project.
 * Check out the original library here:
 * https://github.com/foobar404/Wave.js
 *
 * Thanks foobar404 (the author of the library) for making it open source!
 */

import { IAnimation } from "./types";
import { Wave as WaveAnimation, IWaveOptions } from "./Wave";

export type { IWaveOptions };

export type AudioElement =
  | HTMLAudioElement
  | {
      context: AudioContext;
      source: MediaElementAudioSourceNode;
    };

export class Wave {
  public animations = {
    Wave: WaveAnimation,
  };
  private _activeAnimations: IAnimation[] = [];
  private _audioElement!: HTMLAudioElement;
  private _audioSource!: MediaElementAudioSourceNode;
  private _audioContext!: AudioContext;
  private _audioAnalyser!: AnalyserNode;
  private _canvasElement: HTMLCanvasElement;
  private _canvasContext: CanvasRenderingContext2D;
  private _audioBufferData: Uint8Array;

  constructor(
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement
  ) {
    this._canvasElement = canvasElement;
    this._canvasContext = this._canvasElement.getContext("2d")!;

    this._audioElement = videoElement;
    if (!this._audioSource) {
      this._audioContext = new AudioContext();
      this._audioSource = this._audioContext.createMediaElementSource(
        this._audioElement
      );
      this._audioAnalyser = this._audioContext.createAnalyser();
    }

    this._audioAnalyser.smoothingTimeConstant = 0.85;
    this._audioAnalyser.fftSize = 1024;
    this._audioBufferData = new Uint8Array(
      this._audioAnalyser.frequencyBinCount
    );

    this._play();
  }

  private _play(): void {
    this._audioSource.connect(this._audioAnalyser);
    this._audioSource.connect(this._audioContext.destination);

    const tick = () => {
      if (!this._activeAnimations.length) {
        setTimeout(tick, 1000);
        return;
      }

      this._audioAnalyser.getByteFrequencyData(this._audioBufferData);
      this._canvasContext.clearRect(
        0,
        0,
        this._canvasContext.canvas.width,
        this._canvasContext.canvas.height
      );
      this._activeAnimations.forEach((animation) => {
        animation.draw(this._audioBufferData, this._canvasContext);
      });

      window.requestAnimationFrame(tick);
    };

    tick();
  }

  public addAnimation(animation: IAnimation): void {
    this._activeAnimations.push(animation);
  }

  public clearAnimations(): void {
    this._activeAnimations = [];
  }
}
