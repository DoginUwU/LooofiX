import Player from '@/components/Player';
import { useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import SyncWindows from '@/utils/syncWindows';
import { openSettings } from '@/utils/window';
import { Icon } from '@iconify/react';
import { memo, useEffect, useRef } from 'preact/compat';
import style from './styles.module.scss';
import { convertFileSrc } from '@tauri-apps/api/tauri';

const PlayerLayout = () => {
  const useMusicCtx = useMusic();
  const useThemeCtx = useTheme();
  const useSettingsCtx = useSettings();

  const mainRef = useRef<HTMLDivElement>(null);

  const { audioRef, currentMusicURL } = useMusicCtx;
  const { settings } = useSettingsCtx

  useEffect(() => {
    SyncWindows.addFunctions(useMusicCtx, useThemeCtx, useSettingsCtx);
  }, []);

  useEffect(() => {
    if (!mainRef.current) return

    if (settings.appearance.backgroundImage) {
      const urlPath = convertFileSrc(settings.appearance.backgroundImage)

      mainRef.current.style.backgroundImage = `url(${urlPath})`;
    }
  }, [mainRef.current, settings.appearance.backgroundImage]);


  return (
    <main id="draggable" ref={mainRef}>
      <audio ref={audioRef} src={currentMusicURL} crossOrigin="anonymous" />
      <div className={style.topBar}>
        <button onClick={openSettings}>
          <Icon icon="bi:three-dots" />
        </button>
      </div>
      <Player />
    </main>
  );
}

export default memo(PlayerLayout);
