import React, { memo } from 'react';
import { Icon } from '@iconify/react';

import Iframe from '@/components/Iframe';
import Player from '@/components/Player';

import { useMusic } from '@/contexts/MusicContext';
import { useYoutube } from '@/contexts/YoutubeContext';

import { createNewWindow } from '@/utils/window';
import { SyncWindows } from '@/utils/syncWindows';

import style from './styles.module.scss';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';

const PlayerLayout: React.FC = () => {
  const useMusicCtx = useMusic();
  const useYoutubeCtx = useYoutube();
  const useThemeCtx = useTheme();
  const useSettingsCtx = useSettings();

  new SyncWindows(useYoutubeCtx, useMusicCtx, useThemeCtx, useSettingsCtx);

  return (
    <main id="draggable">
      <div className={style.topBar}>
        <button onClick={createNewWindow}>
          <Icon icon="bi:three-dots" />
        </button>
      </div>
      <Iframe />
      <Player />
    </main>
  );
}

export default memo(PlayerLayout);
