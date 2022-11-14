import React, { useEffect, useState } from 'react';

import { useYoutube, YoutubeVideoStates } from '@/contexts/YoutubeContext';

import { AudioWavesHelper } from './helper';

import style from './styles.module.scss';
import { useTheme } from '@/contexts/ThemeContext';

const AudioWaves: React.FC = () => {
  const [audioWavesHelper, setAudioWavesHelper] = useState<AudioWavesHelper>();
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
      setAudioWavesHelper(new AudioWavesHelper(canvas, videoElement, theme))
    } catch (error) {
      setTimeout(() => {
        setAudioWavesHelper(new AudioWavesHelper(canvas, videoElement, theme))
      }, 5000)
    }

  }, [videoState]);

  useEffect(() => {
    audioWavesHelper?.setTheme(theme);
  }, [theme]);

  return <canvas id="wave-canvas" className={style.waves} />;
}

export default AudioWaves;
