import { useEffect } from 'react'
import Iframe from './components/Iframe'
import Player from './components/Player'
import { YoutubeProvider } from './contexts/YoutubeContext'

const App: React.FC = () => {

  useEffect(() => {
    import('./styles/lightTheme');
  }, []);

  return (
    <YoutubeProvider>
      <Iframe />
      <Player />
    </YoutubeProvider>
  )
}

export default App
