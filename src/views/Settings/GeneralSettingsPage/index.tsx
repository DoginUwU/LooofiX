import React, { memo } from 'react';
import { Icon } from '@iconify/react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';

import { VideoStates, useMusic } from '@/contexts/MusicContext';

import { cx } from '@/utils/cx';

import style from './styles.module.scss';

const GeneralSettingsPage: React.FC = () => {
  const { playlist, currentMusicIndex, currentState, handleByIndexMusic, handlePlay } = useMusic();

  const isMusicActive = (index: number) => currentMusicIndex === index;

  const PlayIcon: React.FC<any> = ({ index }) => {
    if (!isMusicActive(index)) return <Icon icon="mdi:play" fontSize={18} />;

    switch (currentState) {
      case VideoStates.PLAYING:
      case VideoStates.BUFFERING:
        return <Icon icon="mdi:pause" fontSize={18} color="var(--link)" />;
      case VideoStates.PAUSED:
        return <Icon icon="mdi:play" fontSize={18} color="var(--link)" />;
      default:
        return null;
    }
  }

  const handlePlayMusic = (index: number) => {
    if (isMusicActive(index)) {
      handlePlay();
    } else {
      handleByIndexMusic(index);
    }
  }

  return (
    <TooltipProvider>
      <section className={style.container}>
        <h1>Your Saved Songs</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((music, index) => (
              <tr key={music.url} className={cx({ [style.activeMusic]: isMusicActive(index) })}>
                <td>
                  <Button onClick={() => handlePlayMusic(index)}>
                    <PlayIcon index={index} />
                  </Button>
                </td>
                <td>
                  <Tooltip content={music.title}>
                    <p>{music.title}</p>
                  </Tooltip>
                </td>
                <td>
                  <Button className={style.musicDelete} disabled>
                    <Icon icon="fluent:delete-24-filled" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button className={style.findMoreButton} disabled>
          Find more songs (soon)
        </Button>
      </section>
    </TooltipProvider>
  );
}

export default memo(GeneralSettingsPage);
