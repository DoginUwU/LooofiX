import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import { VideoStates, useMusic } from '@/contexts/MusicContext';
import { cx } from '@/utils/cx';
import { Icon } from '@iconify/react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { memo } from 'preact/compat';
import style from './styles.module.scss';

const GeneralSettingsPage = () => {
  const { playlist, currentMusicIndex, currentState, handleByIndexMusic, handlePlay } = useMusic();

  const isMusicActive = (index: number) => currentMusicIndex === index;

  const getIcon = (index: number) => {
    if (!isMusicActive(index)) return "mdi:play"

    switch (currentState) {
      case VideoStates.PLAYING:
      case VideoStates.BUFFERING:
        return "mdi:pause"
      case VideoStates.PAUSED:
        return "mdi:play"
      default:
        return "mdi:play";
    }
  }

  const getIconColor = (index: number) => {
    if (!isMusicActive(index)) return null

    switch (currentState) {
      case VideoStates.PLAYING:
      case VideoStates.BUFFERING:
        return "var(--link)"
      case VideoStates.PAUSED:
        return "var(--link)"
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
                    <Icon icon={getIcon(index)} fontSize={18} color={getIconColor(index)} />
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
