import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { MusicProvider } from './contexts/MusicContext';
import { YoutubeProvider } from './contexts/YoutubeContext';

import { createDrag } from './utils/draggable';

import { router } from './routes';
import './styles/theme.scss';

const App: React.FC = () => {
  useEffect(() => {
    createDrag();
  }, []);

  return (
    <SettingsProvider>
      <ThemeProvider>
        <MusicProvider>
          <YoutubeProvider>
            <RouterProvider router={router} />
          </YoutubeProvider>
        </MusicProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}

export default App
