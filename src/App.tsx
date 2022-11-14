import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { MusicProvider } from './contexts/MusicContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { YoutubeProvider } from './contexts/YoutubeContext';

import { createDrag } from './utils/draggable';

import { router } from './routes';
import './styles/theme.scss';

const App: React.FC = () => {
  useEffect(() => {
    createDrag();
  }, []);

  return (
    <ThemeProvider>
      <MusicProvider>
        <YoutubeProvider>
          <RouterProvider router={router} />
        </YoutubeProvider>
      </MusicProvider>
    </ThemeProvider>
  )
}

export default App
