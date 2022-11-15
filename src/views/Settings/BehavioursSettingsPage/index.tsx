import React from 'react';

import Checkbox from '@/components/Checkbox';

import style from './styles.module.scss';
import { dotNotationToObject } from '@/helpers/dotNotation';
import { useSettings } from '@/contexts/SettingsContext';

const BehavioursSettingsPage: React.FC = () => {
  const { settings, settings: { behaviours }, handleSetSettings } = useSettings();

  const handleSettingsChange = (key: string, value: any) => {
    const updatedBehaviours = dotNotationToObject(behaviours, key, value);

    handleSetSettings({
      ...settings,
      behaviours: updatedBehaviours,
    });
  }

  return (
    <section className={style.container}>
      <h1>Player</h1>
      <div className={style.checks}>
        <Checkbox
          label='Always on top'
          checked={behaviours.alwaysOnTop}
          onCheckedChange={(value) => handleSettingsChange('alwaysOnTop', value)}
        />
      </div>
    </section>
  )
}

export default BehavioursSettingsPage;
