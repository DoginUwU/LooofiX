import { AvailableThemes, useTheme } from '@/contexts/ThemeContext';
import { cx } from '@/utils/cx';
import React from 'react';

import style from './styles.module.scss';

const AppearanceSettingsPage: React.FC = () => {
  const { themeString, handleTheme } = useTheme();

  const isActiveTheme = (theme: AvailableThemes) => themeString === theme;

  const handleThemeChange = (theme: AvailableThemes) => {
    handleTheme(theme);
  }

  return (
    <section className={style.container}>
      <h1>Choose your theme</h1>
      <div className={style.itemsTheme}>
        <div
          onClick={() => handleThemeChange('light')}
          className={cx(style.itemTheme, { [style.itemThemeActive]: isActiveTheme("light") })}
        >
          <img src="/assets/light-theme.svg" alt="Light Theme" />
        </div>
        <div
          onClick={() => handleThemeChange('dark')}
          className={cx(style.itemTheme, { [style.itemThemeActive]: isActiveTheme("dark") })}
        >
          <img src="/assets/dark-theme.svg" alt="Dark Theme" />
        </div>
      </div>
    </section>
  )
}

export default AppearanceSettingsPage;
