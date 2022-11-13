import { useMusic } from '@/contexts/MusicContext';
import { useYoutube } from '@/contexts/YoutubeContext';
import React, { useEffect } from 'react';

const Iframe: React.FC = () => {
  const { currentMusic } = useMusic();
  const { setVideo, setVideoState, video } = useYoutube();

  const syncYoutubeApi = () => {
    if (document.getElementById('youtube-api')) {
      console.log('Youtube API already loaded');
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    tag.id = 'youtube-api';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new YT.Player('player', {
        height: '0',
        width: '0',
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        }
      });
    }
  }

  const onPlayerReady = (event: YoutubeEvent) => {
    setVideo(event.target);
  }

  const onPlayerStateChange = (event: YoutubeEvent) => {
    setVideoState(event.target.getPlayerState());
  }

  useEffect(() => {
    syncYoutubeApi();
  }, []);

  useEffect(() => {
    if (!currentMusic || !video) return;

    video.loadVideoById(currentMusic.id, 0, 'large');
  }, [currentMusic, video]);

  return <div id='player' />;
}

export default Iframe;
