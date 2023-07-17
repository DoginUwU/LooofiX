import { VideoStates, useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'preact/hooks';
import { AudioWavesHelper } from './helper';
import style from './styles.module.scss';

const AudioWaves = () => {
  const [audioWavesHelper, setAudioWavesHelper] = useState<AudioWavesHelper | null>(null);
  const { theme } = useTheme();
  const { settings } = useSettings();
  const { audioRef } = useMusic();

  useEffect(() => {
    if (audioWavesHelper) return;

    const canvas = document.getElementById('wave-canvas') as HTMLCanvasElement;
    const audioElement = audioRef.current;

    if (!audioElement) return;

    try {
      setAudioWavesHelper(new AudioWavesHelper(canvas, audioElement, theme, settings))
    } catch (error) {
      setTimeout(() => {
        setAudioWavesHelper(new AudioWavesHelper(canvas, audioElement, theme, settings))
      }, 5000)
    }
  }, [audioRef.current]);

  useEffect(() => {
    audioWavesHelper?.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    audioWavesHelper?.setSettings(settings);
  }, [settings]);

  return <canvas id="wave-canvas" className={style.waves} />;
}

export default AudioWaves;
