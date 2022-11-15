import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { ISettings } from "@/@types/settings";
import { getSettings, setSettings as setUtilsSettings } from "@/utils/settings";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { SyncWindows } from "@/utils/syncWindows";
import { setAlwaysOnTop } from "@/utils/behaviours";
import { deepSameKeys } from "@/helpers/deepChecker";

interface ISettingsContext {
  settings: ISettings;
  initializeSettings: () => void;
  handleSetSettings: (settings: ISettings) => void;
}

const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext);

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<ISettings>(DEFAULT_SETTINGS);

  const initializeSettings = async () => {
    let settings = await getSettings();

    if (!settings || !deepSameKeys(settings, DEFAULT_SETTINGS)) {
      settings = DEFAULT_SETTINGS;
    }

    setSettings(settings);
  }

  const handleSetSettings = (settings: ISettings, __syncCall?: boolean) => {
    setSettings(settings);
    setUtilsSettings(settings);

    if(!__syncCall) SyncWindows.send('initializeSettings');
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
