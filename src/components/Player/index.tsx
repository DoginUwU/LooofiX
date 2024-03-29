import { useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { cx } from '@/utils/cx';
import { Icon } from '@iconify/react';
import { memo } from 'preact/compat';
import Marquee from "react-fast-marquee";
import AudioWaves from '../AudioWaves';
import { formatElapsedTime, getPlayButtonIcon } from './helper';
import style from './styles.module.scss';

const Player = () => {
  const { handleNextMusic, handlePreviousMusic, currentMusic, handlePlay, currentState, elapsedTime } = useMusic();
  const { settings } = useSettings();

  if (!currentMusic) return null;

  return <section className={cx(style.container, style.containerOnlyHover)}>
    <div className={cx(style.header, { [style.headerOnlyHover]: settings.appearance.player.onlyShowTitleOnHover })}>
      <Marquee gradient={false}>
        <h1 className='title'>
          {currentMusic.title || 'Buffering...'}&nbsp;
        </h1>
      </Marquee>
      <h2>{formatElapsedTime(elapsedTime)} elapsed in LooofiX</h2>
    </div>
    <div className={cx(style.controls, { [style.controlsOnlyHover]: settings.appearance.player.onlyShowControlsOnHover })}>
      <button onClick={() => handlePreviousMusic()}>
        <Icon icon="mdi:skip-previous" fontSize={32} />
      </button>
      <button onClick={() => handlePlay()}>
        <Icon icon={getPlayButtonIcon(currentState)} fontSize={32} />
      </button>
      <button onClick={() => handleNextMusic()}>
        <Icon icon='mdi:skip-next' fontSize={32} />
      </button>
    </div>
    <AudioWaves />
  </section>
}

export default memo(Player);
