import { useYoutube } from '@/contexts/YoutubeContext';
import React, { useEffect } from 'react';

const Iframe: React.FC = () => {
  const { setVideo, setVideoState } = useYoutube();

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
        videoId: 't0cxI-hmxMo',
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
    console.log('onPlayerStateChange', event);
    setVideoState(event.target.getPlayerState());
  }

  useEffect(() => {
    syncYoutubeApi();
  }, []);

  return <div id='player' />;
}

export default Iframe;
