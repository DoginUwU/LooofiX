import React from 'react';
import { AvailableThemes } from '@/@types/theme';
import Checkbox from '@/components/Checkbox';
import { useSettings } from '@/contexts/SettingsContext';
import { cx } from '@/utils/cx';

import style from './styles.module.scss';
import { dotNotationToObject } from '@/helpers/dotNotation';

const AppearanceSettingsPage: React.FC = () => {
  const { settings, settings: { appearance }, handleSetSettings } = useSettings();

  const availableThemes: AvailableThemes[] = ['light', 'dark'];

  const handleSettingsChange = (key: string, value: any) => {
    const updatedAppearance = dotNotationToObject(appearance, key, value);

    handleSetSettings({
      ...settings,
      appearance: updatedAppearance,
    });
  }

  return (
    <section className={style.container}>
      <h1>Choose your theme</h1>
      <div className={style.itemsTheme}>
        {availableThemes.map((theme) => (
          <div
            key={theme}
            className={cx(style.itemTheme, { [style.itemThemeActive]: appearance.theme === theme })}
            onClick={() => handleSettingsChange('theme', theme)}
          >
            <img src={`/assets/${theme}-theme.svg`} alt={`${theme} Theme`} />
          </div>
        ))}
      </div>
      <div className={style.checks}>
        <Checkbox
          label='Only show player title on hover'
          checked={appearance.player.onlyShowTitleOnHover}
          onCheckedChange={(value) => handleSettingsChange('player.onlyShowTitleOnHover', value)}
        />
        <Checkbox
          label='Only show player controls on hover'
          checked={appearance.player.onlyShowControlsOnHover}
          onCheckedChange={(value) => handleSettingsChange('player.onlyShowControlsOnHover', value)}
        />
      </div>
    </section>
  )
}

export default AppearanceSettingsPage;
