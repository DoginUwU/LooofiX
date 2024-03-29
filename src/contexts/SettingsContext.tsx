import { ISettings } from "@/@types/settings";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { setAlwaysOnTop } from "@/utils/behaviours";
import { getSettings, setSettings as setUtilsSettings } from "@/utils/settings";
import SyncWindows from "@/utils/syncWindows";
import { FunctionComponent, createContext } from "preact";
import { PropsWithChildren, useContext, useEffect, useState } from "preact/compat";

interface ISettingsContext {
  settings: ISettings;
  initializeSettings: () => void;
  handleSetSettings: (settings: ISettings) => void;
}

const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext);

const SettingsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<ISettings>(DEFAULT_SETTINGS);

  const initializeSettings = async () => {
    let newSettings = await getSettings();

    if (!newSettings) {
      newSettings = DEFAULT_SETTINGS;
    }

    setSettings(newSettings);
  }

  const handleSetSettings = (newSettings: ISettings) => {
    setSettings(newSettings)
    setUtilsSettings(newSettings);

    SyncWindows.send('initializeSettings');
  }

  useEffect(() => {
    initializeSettings();
  }, []);

  useEffect(() => {
    setAlwaysOnTop(settings.behaviours.alwaysOnTop);
  }, [settings.behaviours.alwaysOnTop]);

  return (
    <SettingsContext.Provider value={{ settings, initializeSettings, handleSetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
};

const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a YoutubeProvider');
  }

  return context;
}

export { SettingsProvider, useSettings };
