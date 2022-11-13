import Button from '@/components/Button';
import { useMusic } from '@/contexts/MusicContext';
import { Icon } from '@iconify/react';
import React, { createElement, memo } from 'react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

import style from './styles.module.scss';
import Tooltip from '@/components/Tooltip';
import { cx } from '@/utils/cx';
import { useYoutube, YoutubeVideoStates } from '@/contexts/YoutubeContext';
import { SyncWindows } from '@/utils/syncWindows';

const GeneralSettingsPage: React.FC = () => {
  const { playlist, currentMusic, handleByIndexMusic } = useMusic();
  const { videoState } = useYoutube();

  const isMusicActive = (id: string) => currentMusic?.id === id;

  const PlayIcon: React.FC<any> = ({ musicId }) => {
    if (!isMusicActive(musicId)) return <Icon icon="mdi:play" fontSize={18} />;

    switch (videoState) {
      case YoutubeVideoStates.PLAYING:
      case YoutubeVideoStates.BUFFERING:
        return <Icon icon="mdi:pause" fontSize={18} color="var(--link)" />;
      case YoutubeVideoStates.PAUSED:
        return <Icon icon="mdi:play" fontSize={18} color="var(--link)" />;
      default:
        return null;
    }
  }

  const handlePlayMusic = (index: number) => {
    SyncWindows.send('handleByIndexMusic', index);
    handleByIndexMusic(index)
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
              <tr key={music.id} className={cx({ [style.activeMusic]: isMusicActive(music.id) })}>
                <td>
                  <Button onClick={() => handlePlayMusic(index)}>
                    <PlayIcon musicId={music.id} />
                  </Button>
                </td>
                <td>
                  <Tooltip content={music.title}>
                    <p>{music.title}</p>
                  </Tooltip>
                </td>
                <td>
                  <Button className={style.musicDelete}>
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
