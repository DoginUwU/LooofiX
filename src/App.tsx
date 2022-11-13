import { useEffect } from 'react'

import { MusicProvider } from './contexts/MusicContext'
import { YoutubeProvider } from './contexts/YoutubeContext'
import PlayerLayout from './layouts/PlayerLayout'

import { createDrag } from './utils/draggable'

const App: React.FC = () => {

  useEffect(() => {
    createDrag();
    import('./styles/lightTheme');
  }, []);

  return (
    <MusicProvider>
      <YoutubeProvider>
        <PlayerLayout />
      </YoutubeProvider>
    </MusicProvider>
  )
}

export default App
