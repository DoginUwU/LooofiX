import { VideoStates, useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, useState } from 'preact/hooks';
import { AudioWavesHelper } from './helper';
import style from './styles.module.scss';

const AudioWaves = () => {
  const [audioWavesHelper, setAudioWavesHelper] = useState<AudioWavesHelper | null>(null);
  const { theme } = useTheme();
  const { settings } = useSettings();
  const { audioRef } = useMusic();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (audioWavesHelper) return;

    const canvas = canvasRef.current;
    const audioElement = audioRef.current;

    if (!audioElement || !canvas) return;

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

    if (canvasRef.current && settings.appearance.backgroundImage) {
      canvasRef.current.style.opacity = '0.9';
    }
  }, [settings]);

  return <canvas id="wave-canvas" className={style.waves} ref={canvasRef} />;
}

export default AudioWaves;
