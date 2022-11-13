import React from 'react';
import { Icon } from '@iconify/react';

import styles from './styles.module.scss';
import { useYoutube } from '@/contexts/YoutubeContext';
import { formatElapsedTime } from './helper';
import AudioWaves from '../AudioWaves';

const Player: React.FC = () => {
  const { video, elapsed } = useYoutube();

  if (!video) return null;

  const handlePlay = () => {
    video.playVideo();
  }

  return <main className={styles.container}>
    <div className={styles.header}>
      <h1>{video.videoTitle}</h1>
      <h2>{formatElapsedTime(elapsed)} </h2>
    </div>
    <div className={styles.controls}>
      <button><Icon icon="bi:pause-fill" fontSize={32} onClick={handlePlay} /></button>
    </div>
    <AudioWaves />
  </main>
}

export default Player;
