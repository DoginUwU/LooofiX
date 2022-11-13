import React from 'react';
import { Icon } from '@iconify/react';
import Marquee from "react-fast-marquee";

import { useYoutube } from '@/contexts/YoutubeContext';
import { formatElapsedTime, getPlayButtonIcon } from './helper';
import AudioWaves from '../AudioWaves';

import styles from './styles.module.scss';

const Player: React.FC = () => {
  const { video, elapsed, videoState } = useYoutube();

  if (!video) return null;

  const handlePlay = () => {
    video.playVideo();
  }

  return <main className={styles.container}>
    <div className={styles.header}>
      <Marquee className='title' gradientWidth={50}>{video.videoTitle}</Marquee>
      <h2>{formatElapsedTime(elapsed)} elapsed in LooofiX</h2>
    </div>
    <div className={styles.controls}>
      <button onClick={handlePlay}>
        <Icon icon={getPlayButtonIcon(videoState)} fontSize={32} />
      </button>
    </div>
    <AudioWaves />
  </main>
}

export default Player;
