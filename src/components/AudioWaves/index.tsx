import React, { useEffect } from 'react';

import { useYoutube, YoutubeVideoStates } from '@/contexts/YoutubeContext';

import { AudioWavesHelper } from './helper';

import style from './styles.module.scss';
import { useTheme } from '@/contexts/ThemeContext';

const AudioWaves: React.FC = () => {
  const { video, videoState } = useYoutube();
  const { theme } = useTheme();

  useEffect(() => {
    if(videoState !== YoutubeVideoStates.PLAYING) return;

    const canvas = document.getElementById('wave-canvas') as HTMLCanvasElement;

    if (!video || !canvas) return;

    const iframe = video.getIframe();
    const videoElement = iframe.contentWindow?.document.querySelector('video');

    if (!videoElement) return;

    try {
      new AudioWavesHelper(canvas, videoElement, theme)
    } catch (error) {
      setTimeout(() => {
        new AudioWavesHelper(canvas, videoElement, theme)
      }, 5000)
    }

  }, [videoState]);

  return <canvas id="wave-canvas" className={style.waves} />;
}

export default AudioWaves;
