interface YoutubeVideo {
  addCueRange: (start: number, end: number, cueId: string) => void;
  clearVideo: () => void;
  cueVideoById: (
    videoId: string,
    startSeconds: number,
    suggestedQuality: string
  ) => void;
  cueVideoByUrl: (
    mediaContentUrl: string,
    startSeconds: number,
    suggestedQuality: string
  ) => void;
  destroy: () => void;
  getAvailableQualityLevels: () => string[];
  getDuration: () => number;
  getEmbedCode: () => string;
  getIframe: () => HTMLIFrameElement;
  getOption: (key: string, defaultValue: any) => any;
  getOptions: () => string[];
  getPlaylist: () => string[];
  getPlaylistIndex: () => number;
  getPlaybackQuality: () => string;
  getPlayerState: () => number;
  getVideoBytesLoaded: () => number;
  getVideoBytesTotal: () => number;
  getVideoEmbedCode: () => string;
  getVideoLoadedFraction: () => number;
  getCurrentTime: () => number;
  getVideoUrl: () => string;
  getVolume: () => number;
  isMuted: () => boolean;
  loadVideoById: (
    videoId: string,
    startSeconds: number,
    suggestedQuality: string
  ) => void;
  loadVideoByUrl: (
    mediaContentUrl: string,
    startSeconds: number,
    suggestedQuality: string
  ) => void;
  mute: () => void;
  nextVideo: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  previousVideo: () => void;
  removeCueRange: (cueId: string) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setLoop: (loopPlaylists: boolean) => void;
  setOption: (key: string, value: any) => void;
  setPlaybackQuality: (suggestedQuality: string) => void;
  setShuffle: (shufflePlaylist: boolean) => void;
  setSize: (width: number, height: number) => void;
  setVolume: (volume: number) => void;
  stopVideo: () => void;
  unMute: () => void;
  showVideoInfo: () => void;
  videoTitle: string;
}

interface YoutubeEvent {
  data: any;
  target: YoutubeVideo;
}

interface YoutubePlayerOptions {
  height?: string;
  width?: string;
  videoId?: string;
  events?: {
    onReady: (event: YoutubeEvent) => void;
    onStateChange: (event: YoutubeEvent) => void;
  };
}

declare module YT {
  class Player {
    constructor(iframeId: string, options: YoutubePlayerOptions);
  }
}
