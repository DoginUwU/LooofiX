import { YoutubeVideoStates } from "@/contexts/YoutubeContext";
import moment from "moment";

const formatElapsedTime = (seconds: number) => {
  return moment.utc(seconds * 1000).format("HH:mm:ss");
};

const getPlayButtonIcon = (state: number) => {
  switch (state) {
    case YoutubeVideoStates.PLAYING:
      return "bi:pause-fill";
    case YoutubeVideoStates.PAUSED:
      return "bi:play-fill";
    default:
      return "bi:play-fill";
  }
};

export { formatElapsedTime, getPlayButtonIcon };
