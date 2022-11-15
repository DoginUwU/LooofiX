import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { ISettings } from "@/@types/settings";
import { getSettings, setSettings as setUtilsSettings } from "@/utils/settings";
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { SyncWindows } from "@/utils/syncWindows";

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

    if (!settings) {
      settings = DEFAULT_SETTINGS;
    }

    console.log(settings)

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
