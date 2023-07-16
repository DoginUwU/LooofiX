import Player from '@/components/Player';
import { useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SyncWindows } from '@/utils/syncWindows';
import { createNewWindow } from '@/utils/window';
import { Icon } from '@iconify/react';
import { memo } from 'preact/compat';
import style from './styles.module.scss';

const PlayerLayout = () => {
  const useMusicCtx = useMusic();
  const useThemeCtx = useTheme();
  const useSettingsCtx = useSettings();

  new SyncWindows(useMusicCtx, useThemeCtx, useSettingsCtx);

  return (
    <main id="draggable">
      <div className={style.topBar}>
        <button onClick={createNewWindow}>
          <Icon icon="bi:three-dots" />
        </button>
      </div>
      <Player />
    </main>
  );
}

export default memo(PlayerLayout);
