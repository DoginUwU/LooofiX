import SettingsSidebar from '@/components/SettingsSidebar';
import { useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import SyncWindows from '@/utils/syncWindows';
import { closeWindow } from '@/utils/window';
import { memo } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import style from './styles.module.scss';

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState<JSX.Element | null>(null);
  const useMusicCtx = useMusic();
  const useThemeCtx = useTheme();
  const useSettingsCtx = useSettings();

  const handleTabChange = (tab: JSX.Element) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    SyncWindows.addFunctions(useMusicCtx, useThemeCtx, useSettingsCtx);
  }, [])

  return (
    <main className={style.container}>
      <div className={style.topBar} id="draggable">
        <div className={style.topBarTitle}>
          <h1>Settings</h1>
        </div>
        <div className={style.topBarActions}>
          <button className="close" onClick={closeWindow} />
        </div>
      </div>
      <SettingsSidebar onTabChange={handleTabChange} />
      <div className={style.content}>
        {activeTab}
      </div>
    </main>
  );
}

export default memo(SettingsLayout);
