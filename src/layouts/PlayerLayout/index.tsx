import React, { memo } from 'react';
import { Icon } from '@iconify/react';

import Player from '@/components/Player';

import { useMusic } from '@/contexts/MusicContext';

import { createNewWindow } from '@/utils/window';
import { SyncWindows } from '@/utils/syncWindows';

import style from './styles.module.scss';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';

const PlayerLayout: React.FC = () => {
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
