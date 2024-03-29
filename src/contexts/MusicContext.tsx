import { IStream, getAllStreams } from "@/services/stream";
import SyncWindows from "@/utils/syncWindows";
import { FunctionComponent, createContext } from "preact";
import { PropsWithChildren, useContext, useEffect, useRef, useState } from "preact/compat";

export const VideoStates = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5,
}

interface IMusicContext {
  playlist: IStream[];
  elapsedTime: number;
  currentState: number;
  currentMusic: IStream | null;
  currentMusicURL: string;
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
  const [playlist, setPlaylist] = useState<IStream[]>([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(0);
  const [currentMusicURL, setCurrentMusicURL] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currentState, setCurrentState] = useState<number>(VideoStates.UNSTARTED);
  const currentMusic = playlist[currentMusicIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNextMusic = () => {
    let nextMusicIndex = currentMusicIndex + 1;
    if (currentMusicIndex === playlist.length - 1) {
      nextMusicIndex = 0;
    }

    setCurrentMusicIndex(nextMusicIndex);
    SyncWindows.send('setCurrentMusicIndex', nextMusicIndex);
  }

  const handlePreviousMusic = () => {
    let previousMusicIndex = currentMusicIndex - 1;
    if (!currentMusicIndex) {
      previousMusicIndex = playlist.length - 1;
    }

    setCurrentMusicIndex(previousMusicIndex);
    SyncWindows.send('setCurrentMusicIndex', previousMusicIndex);
  }

  const handleByIndexMusic = (index: number) => {
    if (!playlist[index]) return;

    setCurrentMusicIndex(index);
    SyncWindows.send('handleByIndexMusic', index);
  }

  const handlePlay = () => {
    if (!audioRef.current) {
      SyncWindows.send('handlePlay');
    }

    if (currentState === VideoStates.PLAYING) {
      audioRef.current?.pause();
      setCurrentState(VideoStates.PAUSED);
    } else {
      audioRef.current?.play();
      setCurrentState(VideoStates.PLAYING);
    }
  }

  const syncState = () => {
    if (!audioRef.current) return;

    const state = audioRef.current.paused ? VideoStates.PAUSED : VideoStates.PLAYING;

    setCurrentState(state);
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setElapsedTime(audioRef.current.currentTime);
  }

  const updatePlaylist = async () => {
    const playlist = await getAllStreams();

    setPlaylist(playlist);
  }

  useEffect(() => {
    updatePlaylist()
  }, [])

  useEffect(() => {
    if (!currentMusic) return;

    setCurrentMusicURL(`${import.meta.env.VITE_API_URL}/streams/${currentMusic.id}/play`);
  }, [currentMusic])

  useEffect(() => {
    if(!audioRef.current) return;

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('play', syncState);
    audioRef.current.addEventListener('pause', syncState);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current?.removeEventListener('play', syncState);
      audioRef.current?.removeEventListener('pause', syncState);
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
      currentMusicURL,
    }}>
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
