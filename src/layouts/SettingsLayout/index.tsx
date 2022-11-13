import SettingsContainer from '@/components/SettingsContainer';
import { useMusic } from '@/contexts/MusicContext';
import { closeWindow } from '@/utils/window';
import React, { memo } from 'react';

import style from './styles.module.scss';

const SettingsLayout: React.FC = () => {
  const { playlist } = useMusic();

  return (
    <main className={style.container}>
      <div className={style.topBar}>
        <h1>Settings</h1>
      </div>
      <div className={style.settings}>
        <SettingsContainer title='Choose your theme'>
          <div className={style.themeCards}>
            <div className={`${style.themeCard} ${style.themeCardActive}`}>
              <img src="/assets/white-theme.svg" alt="White theme" />
            </div>
          </div>
        </SettingsContainer>
        <SettingsContainer title='LooofiX behaviours'>
          <div>
            <input type="checkbox" name="awaysTop" id="awaysTop" />
            <label htmlFor="awaysTop">Aways on top</label>
          </div>
        </SettingsContainer>
        <SettingsContainer title='Change your musics'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((music, index) => (
                <tr key={`${music.id}${index}`}>
                  <td>{music.id}</td>
                  <td>{music.title}</td>
                  <td>
                    <button>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <input type="text" placeholder='Music watch id' />
            <input type="text" placeholder='Music title' />
            <button>Add</button>
          </div>
        </SettingsContainer>
      </div>
      {/* <div className={style.profile}>
        <img src="/assets/me.jpg" alt="Luiz ♡#8950" />
        <h1>Luiz ♡#8950</h1>
      </div> */}
      <div>
        <button onClick={() => closeWindow()}>Close</button>
      </div>
    </main>
  );
}

export default memo(SettingsLayout);
