import Player from '@/components/Player';
import { useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import SyncWindows from '@/utils/syncWindows';
import { openSettings } from '@/utils/window';
import { Icon } from '@iconify/react';
import { memo, useEffect } from 'preact/compat';
import style from './styles.module.scss';

const PlayerLayout = () => {
  const useMusicCtx = useMusic();
  const useThemeCtx = useTheme();
  const useSettingsCtx = useSettings();

  const { handlePlay, audioRef, currentMusic, currentMusicURL } = useMusicCtx;

  useEffect(() => {
    SyncWindows.addFunctions(useMusicCtx, useThemeCtx, useSettingsCtx);

    handlePlay();
  }, []);

  return (
    <main id="draggable">
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
