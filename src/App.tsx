import { useEffect } from 'react'
import Iframe from './components/Iframe'
import Player from './components/Player'
import { MusicProvider } from './contexts/MusicContext'
import { YoutubeProvider } from './contexts/YoutubeContext'

const App: React.FC = () => {

  useEffect(() => {
    import('./styles/lightTheme');
  }, []);

  return (
    <MusicProvider>
      <YoutubeProvider>
        <Iframe />
        <Player />
      </YoutubeProvider>
    </MusicProvider>
  )
}

export default App
