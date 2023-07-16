import { useEffect } from 'preact/hooks';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { MusicProvider } from './contexts/MusicContext';

import { createDrag } from './utils/draggable';

import { router } from './routes';
import './styles/theme.scss';

const App = () => {
  useEffect(() => {
    createDrag();
  }, []);

  return (
    <SettingsProvider>
      <ThemeProvider>
        <MusicProvider>
          <RouterProvider router={router} />
        </MusicProvider>
      </ThemeProvider>
    </SettingsProvider>
  )
}

export default App
