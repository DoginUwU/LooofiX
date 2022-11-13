import { IMusic } from "@/@types/music";
import { DEFAULT_MUSIC_PLAYLIST } from "@/constants/music";
import { SyncWindows } from "@/utils/syncWindows";
import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";

interface IMusicContext {
  playlist: IMusic[];
  currentMusic: IMusic | null;
  currentMusicIndex: number;
  setCurrentMusicIndex: (index: number) => void;
  handleByIndexMusic: (index: number) => void;
  handleNextMusic: () => void;
  handlePreviousMusic: () => void;
}

const MusicContext = createContext<IMusicContext>({} as IMusicContext);

const MusicProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [playlist, setPlaylist] = useState<IMusic[]>(DEFAULT_MUSIC_PLAYLIST);
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(0);
  const currentMusic = playlist[currentMusicIndex];

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

  return (
    <MusicContext.Provider value={{
      currentMusic,
      currentMusicIndex,
      playlist,
      handleByIndexMusic,
      handleNextMusic,
      handlePreviousMusic,
      setCurrentMusicIndex,
    }}>
      {children}
    </MusicContext.Provider>
  );
};

const useMusic = () => {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useYoutube must be used within a YoutubeProvider');
  }

  return context;
}

export { MusicProvider, useMusic };
