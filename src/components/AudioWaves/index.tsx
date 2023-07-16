import React, { useEffect, useState } from 'react';

import { AudioWavesHelper } from './helper';

import style from './styles.module.scss';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import { VideoStates, useMusic } from '@/contexts/MusicContext';

const AudioWaves: React.FC = () => {
  const [audioWavesHelper, setAudioWavesHelper] = useState<AudioWavesHelper>();
  const { theme } = useTheme();
  const { settings } = useSettings();
  const { currentState, audioRef } = useMusic();

  useEffect(() => {
    if(currentState !== VideoStates.PLAYING) return;

    const canvas = document.getElementById('wave-canvas') as HTMLCanvasElement;
    const audioElement = audioRef.current;

    if(!audioElement) return;

    try {
      setAudioWavesHelper(new AudioWavesHelper(canvas, audioElement, theme, settings))
    } catch (error) {
      setTimeout(() => {
        setAudioWavesHelper(new AudioWavesHelper(canvas, audioElement, theme, settings))
      }, 5000)
    }

  }, [currentState]);

  useEffect(() => {
    audioWavesHelper?.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    audioWavesHelper?.setSettings(settings);
  }, [settings]);

  return <canvas id="wave-canvas" className={style.waves} />;
}

export default AudioWaves;
