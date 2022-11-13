import React, { memo } from 'react';
import { Icon } from '@iconify/react';

import Iframe from '@/components/Iframe';
import Player from '@/components/Player';

import style from './styles.module.scss';
import { createNewWindow } from '@/utils/window';

const PlayerLayout: React.FC = () => {
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
