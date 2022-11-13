import SettingsSidebar from '@/components/SettingsSidebar';
import React, { createElement, FC, memo, useState } from 'react';

import style from './styles.module.scss';

const SettingsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<JSX.Element | null>(null);

  const handleTabChange = (tab: JSX.Element) => {
    setActiveTab(tab);
  }

  return (
    <main className={style.container} id="draggable">
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
