import React from 'react';
import { Icon } from '@iconify/react';
import Marquee from "react-fast-marquee";

import { useYoutube, YoutubeVideoStates } from '@/contexts/YoutubeContext';
import { useMusic } from '@/contexts/MusicContext';
import { formatElapsedTime, getPlayButtonIcon } from './helper';
import AudioWaves from '../AudioWaves';

import styles from './styles.module.scss';

const Player: React.FC = () => {
  const { video, elapsed, videoState } = useYoutube();
  const { handleNextMusic, handlePreviousMusic } = useMusic();

  if (!video) return null;

  const handlePlay = () => {
    switch (videoState) {
      case YoutubeVideoStates.PLAYING:
        video.pauseVideo();
        break;

      case YoutubeVideoStates.UNSTARTED:
      case YoutubeVideoStates.PAUSED:
      case YoutubeVideoStates.BUFFERING:
        video.playVideo();
        break;
    }
  }

  return <main className={styles.container}>
    <div className={styles.header}>
      <Marquee className='title' gradientWidth={50}>{video.videoTitle}</Marquee>
      <h2>{formatElapsedTime(elapsed)} elapsed in LooofiX</h2>
    </div>
    <div className={styles.controls}>
      <button onClick={handlePreviousMusic}>
        <Icon icon="mdi:skip-previous" fontSize={32} />
      </button>
      <button onClick={handlePlay}>
        <Icon icon={getPlayButtonIcon(videoState)} fontSize={32} />
      </button>
      <button onClick={handleNextMusic}>
        <Icon icon='mdi:skip-next' fontSize={32} />
      </button>
    </div>
    <AudioWaves />
  </main>
}

export default Player;
