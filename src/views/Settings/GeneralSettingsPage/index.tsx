import { useMusic } from '@/contexts/MusicContext';
import React, { memo, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

import style from './styles.module.scss';

const GeneralSettingsPage: React.FC = () => {
  const { playlist } = useMusic();

  return (
    <section className={style.container}>
      <h1>Your Saved Musics</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {playlist.map((music) => (
            <tr key={music.id}>
              <td>{music.id}</td>
              <td><Marquee gradient={false}>{music.title}</Marquee></td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default memo(GeneralSettingsPage);
