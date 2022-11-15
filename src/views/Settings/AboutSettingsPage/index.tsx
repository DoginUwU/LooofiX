import Button from '@/components/Button';
import React from 'react';

import style from './styles.module.scss';

const AboutSettingsPage: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.me}>
        <img src="https://cdn.discordapp.com/attachments/768646098964709446/1041351387545616395/7c1909172812a3bdf3a80e61137d3000.jpg" alt="Author" />
        <h1>Luiz ♡#8950</h1>
      </div>
      <div className={style.info}>
        <div>
          <h1>Version</h1>
          <p>1.0.0</p>
        </div>
        <div>
          <h1>License</h1>
          <p>MIT</p>
        </div>
        <div>
          <h1>Github</h1>
          <a href="https://github.com/DoginUwU/LooofiX">
            <Button>Open</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutSettingsPage;
