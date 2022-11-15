import React, { useEffect, useState } from 'react';

import { useYoutube, YoutubeVideoStates } from '@/contexts/YoutubeContext';

import { AudioWavesHelper } from './helper';

import style from './styles.module.scss';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';

const AudioWaves: React.FC = () => {
  const [audioWavesHelper, setAudioWavesHelper] = useState<AudioWavesHelper>();
  const { video, videoState } = useYoutube();
  const { theme } = useTheme();
  const { settings } = useSettings();

  useEffect(() => {
    if(videoState !== YoutubeVideoStates.PLAYING) return;

    const canvas = document.getElementById('wave-canvas') as HTMLCanvasElement;

    if (!video || !canvas) return;

    const iframe = video.getIframe();
    const videoElement = iframe.contentWindow?.document.querySelector('video');

    if (!videoElement) return;

    try {
      setAudioWavesHelper(new AudioWavesHelper(canvas, videoElement, theme, settings))
    } catch (error) {
      setTimeout(() => {
        setAudioWavesHelper(new AudioWavesHelper(canvas, videoElement, theme, settings))
      }, 5000)
    }

  }, [videoState]);

  useEffect(() => {
    audioWavesHelper?.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    audioWavesHelper?.setSettings(settings);
  }, [settings]);

  return <canvas id="wave-canvas" className={style.waves} />;
}

export default AudioWaves;
