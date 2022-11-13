import { IMusic } from "@/@types/music";
import { DEFAULT_MUSIC_PLAYLIST } from "@/constants/music";
import { SyncWindows } from "@/utils/syncWindows";
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";

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

  const handleNextMusic = () => {
    if (currentMusicIndex === playlist.length - 1) {
      setCurrentMusicIndex(0);
      return;
    }

    setCurrentMusicIndex(currentMusicIndex + 1);
  }

  const handlePreviousMusic = () => {
    if (!currentMusicIndex) {
      setCurrentMusicIndex(playlist.length - 1);
      return;
    }

    setCurrentMusicIndex(currentMusicIndex - 1);
  }

  const handleByIndexMusic = (index: number) => {
    if (!playlist[index]) return;

    setCurrentMusicIndex(index);
  }

  useEffect(() => {
    SyncWindows.send('setCurrentMusicIndex', currentMusicIndex);
  }, [currentMusicIndex]);

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
