import React, { memo, useState } from 'react';
import SettingsSidebar from '@/components/SettingsSidebar';
import { useMusic } from '@/contexts/MusicContext';
import { SyncWindows } from '@/utils/syncWindows';

import style from './styles.module.scss';
import { useYoutube } from '@/contexts/YoutubeContext';

const SettingsLayout: React.FC = () => {
  const { setCurrentMusicIndex } = useMusic();
  const { handleVideoStateChange } = useYoutube();
  const [activeTab, setActiveTab] = useState<JSX.Element | null>(null);
  new SyncWindows(["setCurrentMusicIndex", setCurrentMusicIndex], ["handleVideoStateChange", handleVideoStateChange]);

  const handleTabChange = (tab: JSX.Element) => {
    setActiveTab(tab);
  }

  return (
    <main className={style.container}>
      <div className={style.topBar}>
        <h1>Settings</h1>
      </div>
      <SettingsSidebar onTabChange={handleTabChange} />
      <div className={style.content}>
        {activeTab}
      </div>
    </main>
  );
}

export default memo(SettingsLayout);
