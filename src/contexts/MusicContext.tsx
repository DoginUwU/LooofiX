import { IMusic } from "@/@types/music";
import { AudioWavesHelper } from "@/components/AudioWaves/helper";
import { DEFAULT_MUSIC_PLAYLIST } from "@/components/constants/music";
import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";

interface IMusicContext {
  playlist: IMusic[];
  currentMusic: IMusic | null;
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
    if (currentMusicIndex === 0) {
      setCurrentMusicIndex(playlist.length - 1);
      return;
    }

    setCurrentMusicIndex(currentMusicIndex - 1);
  }

  return (
    <MusicContext.Provider value={{
      currentMusic,
      playlist,
      handleNextMusic,
      handlePreviousMusic
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
