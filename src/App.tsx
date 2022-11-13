import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { MusicProvider } from './contexts/MusicContext'
import { YoutubeProvider } from './contexts/YoutubeContext'

import { router } from './routes'

import { createDrag } from './utils/draggable'

const App: React.FC = () => {
  useEffect(() => {
    createDrag();
    import('./styles/lightTheme');
  }, []);

  return (
    <MusicProvider>
      <YoutubeProvider>
        <RouterProvider router={router} />
      </YoutubeProvider>
    </MusicProvider>
  )
}

export default App
