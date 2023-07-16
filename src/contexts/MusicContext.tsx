import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";

import { IMusic } from "@/@types/music";

import { DEFAULT_MUSIC_PLAYLIST } from "@/constants/music";

import { SyncWindows } from "@/utils/syncWindows";

export const VideoStates = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5,
}

interface IMusicContext {
  playlist: IMusic[];
  elapsedTime: number;
  currentState: number;
  currentMusic: IMusic | null;
  currentMusicIndex: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentMusicIndex: (index: number) => void;
  handleByIndexMusic: (index: number) => void;
  handlePlay: () => void;
  handleNextMusic: () => void;
  handlePreviousMusic: () => void;
}

const MusicContext = createContext<IMusicContext>({} as IMusicContext);

const MusicProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [playlist, setPlaylist] = useState<IMusic[]>(DEFAULT_MUSIC_PLAYLIST);
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currentState, setCurrentState] = useState<number>(VideoStates.UNSTARTED);
  const currentMusic = playlist[currentMusicIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNextMusic = (__syncCall?: boolean) => {
    let nextMusicIndex = currentMusicIndex + 1;
    if (currentMusicIndex === playlist.length - 1) {
      nextMusicIndex = 0;
    }

    setCurrentMusicIndex(nextMusicIndex);
    if(!__syncCall) SyncWindows.send('setCurrentMusicIndex', nextMusicIndex);
  }

  const handlePreviousMusic = (__syncCall?: boolean) => {
    let previousMusicIndex = currentMusicIndex - 1;
    if (!currentMusicIndex) {
      previousMusicIndex = playlist.length - 1;
    }

    setCurrentMusicIndex(previousMusicIndex);
    if(!__syncCall) SyncWindows.send('setCurrentMusicIndex', previousMusicIndex);
  }

  const handleByIndexMusic = (index: number, __syncCall?: boolean) => {
    if (!playlist[index]) return;

    setCurrentMusicIndex(index);
    if(!__syncCall) SyncWindows.send('handleByIndexMusic', index);
  }

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (currentState === VideoStates.PLAYING) {
      audioRef.current.pause();
      setCurrentState(VideoStates.PAUSED);
    } else {
      audioRef.current.play();
      setCurrentState(VideoStates.PLAYING);
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setElapsedTime(audioRef.current.currentTime);
  }

  useEffect(() => {
    if(!audioRef.current) return;

    audioRef.current.crossOrigin = "anonymous";

    handlePlay()

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [audioRef.current])

  return (
    <MusicContext.Provider value={{
      elapsedTime,
      currentMusic,
      currentState,
      currentMusicIndex,
      playlist,
      audioRef,
      handleByIndexMusic,
      handlePlay,
      handleNextMusic,
      handlePreviousMusic,
      setCurrentMusicIndex,
    }}>
      <audio ref={audioRef} src={currentMusic.url} />
      {children}
    </MusicContext.Provider>
  );
};

const useMusic = () => {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useMusic must be used within a YoutubeProvider');
  }

  return context;
}

export { MusicProvider, useMusic };
