import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";

const YoutubeVideoStates = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5,
}

interface IYoutubeContext {
  video: YoutubeVideo | null;
  setVideo: (video: YoutubeVideo | null) => void;
  videoState: number;
  setVideoState: (videoState: number) => void;
  elapsed: number;
}

const YoutubeContext = createContext<IYoutubeContext>({} as IYoutubeContext);

const YoutubeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [video, setVideo] = useState<YoutubeVideo | null>(null);
  const [videoState, setVideoState] = useState<number>(YoutubeVideoStates.UNSTARTED);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!video) return;

      setElapsed(video.getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [video]);

  return (
    <YoutubeContext.Provider value={{ video, elapsed, videoState, setVideoState, setVideo }}>
      {children}
    </YoutubeContext.Provider>
  );
};

const useYoutube = () => {
  const context = useContext(YoutubeContext);

  if (!context) {
    throw new Error('useYoutube must be used within a YoutubeProvider');
  }

  return context;
}

export { YoutubeProvider, useYoutube, YoutubeVideoStates };
