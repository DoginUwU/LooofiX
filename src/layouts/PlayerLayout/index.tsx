import React, { memo } from 'react';
import { Icon } from '@iconify/react';

import Iframe from '@/components/Iframe';
import Player from '@/components/Player';

import { createNewWindow } from '@/utils/window';

import style from './styles.module.scss';
import { useMusic } from '@/contexts/MusicContext';
import { SyncWindows } from '@/utils/syncWindows';

const PlayerLayout: React.FC = () => {
  const { handleByIndexMusic } = useMusic();
  new SyncWindows(["handleByIndexMusic", handleByIndexMusic]);

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
