import GeneralSettingsPage from "@/views/Settings/GeneralSettingsPage";
import AppearanceSettingsPage from "@/views/Settings/AppearanceSettingsPage";
import BehavioursSettingsPage from "@/views/Settings/BehavioursSettingsPage";

const ITEMS = [
  {
    id: "general",
    title: "General",
    icon: "mdi:settings",
    component: <GeneralSettingsPage />,
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: "mdi:palette",
    component: <AppearanceSettingsPage />,
  },
  {
    id: "behaviours",
    title: "Behaviours",
    icon: "mdi:gesture-tap",
    component: <BehavioursSettingsPage />,
  },
  {
    id: "about",
    title: "About",
    icon: "mdi:information",
    bottom: true,
    component: <GeneralSettingsPage />,
  },
];

export { ITEMS };
