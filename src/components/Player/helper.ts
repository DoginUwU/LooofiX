import { VideoStates } from "@/contexts/MusicContext";
import moment from "moment";

const formatElapsedTime = (seconds: number) => {
  return moment.utc(seconds * 1000).format("HH:mm:ss");
};

const getPlayButtonIcon = (state: number) => {
  switch (state) {
    case VideoStates.PLAYING:
      return "bi:pause-fill";
    case VideoStates.PAUSED:
      return "bi:play-fill";
    default:
      return "bi:play-fill";
  }
};

export { formatElapsedTime, getPlayButtonIcon };
