import { SyncWindows } from "@/utils/syncWindows";
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
  videoState: number;
  elapsed: number;
  handlePlay: () => void;
  handleVideoStateChange: (state: number) => void;
  handleVideo: (video: YoutubeVideo) => void;
}

const YoutubeContext = createContext<IYoutubeContext>({} as IYoutubeContext);

const YoutubeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [video, setVideo] = useState<YoutubeVideo | null>(null);
  const [videoState, setVideoState] = useState<number>(YoutubeVideoStates.UNSTARTED);
  const [elapsed, setElapsed] = useState(0);

  const handlePlay = (__syncCall?: boolean) => {
    switch (videoState) {
      case YoutubeVideoStates.PLAYING:
        video?.pauseVideo();
        break;

      case YoutubeVideoStates.UNSTARTED:
      case YoutubeVideoStates.PAUSED:
      case YoutubeVideoStates.BUFFERING:
        video?.playVideo();
        break;
    }

    if(!__syncCall) SyncWindows.send('handlePlay');
  }

  const handleVideoStateChange = (state: number, __syncCall?: boolean) => {
    setVideoState(state);

    if(!__syncCall) SyncWindows.send('handleVideoStateChange', state);
  }

  const handleVideo = (video: YoutubeVideo | null, __syncCall?: boolean) => {
    setVideo(video);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!video) return;

      setElapsed(video.getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [video]);

  return (
    <YoutubeContext.Provider value={{ video, elapsed, videoState, handlePlay, handleVideoStateChange, handleVideo }}>
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
