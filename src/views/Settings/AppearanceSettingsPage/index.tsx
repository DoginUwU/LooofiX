import { AvailableThemes } from '@/@types/theme';
import Checkbox from '@/components/Checkbox';
import { useSettings } from '@/contexts/SettingsContext';
import { dotNotationToObject } from '@/helpers/dotNotation';
import { cx } from '@/utils/cx';
import style from './styles.module.scss';
import { getDocumentAppDir } from '@/helpers/fs';
import { writeBinaryFile, removeFile } from '@tauri-apps/api/fs';

const AppearanceSettingsPage = () => {
  const { settings, settings: { appearance }, handleSetSettings } = useSettings();

  const availableThemes: AvailableThemes[] = ['light', 'dark'];

  const handleSettingsChange = (key: string, value: any) => {
    const updatedAppearance = dotNotationToObject(appearance, key, value);

    handleSetSettings({
      ...settings,
      appearance: updatedAppearance,
    });
  }

  const handleBackground = async (event: any) => {
    const file = event.target.files[0];
    const path = await getDocumentAppDir();
    const extension = file.name.split('.').pop();
    const imagePath = `${path}/background.${extension}`;

    try {
      await removeFile(imagePath);
    } catch (error) {
        // expected
    }

    const fileToWrite = new Uint8Array(await file.arrayBuffer());
    await writeBinaryFile(imagePath, fileToWrite);

    handleSetSettings({
      ...settings,
      appearance: {
        ...appearance,
        backgroundImage: imagePath,
      },
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
            <img src={`pictures/${theme}-theme.svg`} alt={`${theme} Theme`} />
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
      <input type="file" onChange={handleBackground} />
    </section>
  )
}

export default AppearanceSettingsPage;
