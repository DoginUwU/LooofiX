import { createHashRouter } from "react-router-dom";
import PlayerLayout from "@/layouts/PlayerLayout";
import SettingsLayout from "@/layouts/SettingsLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <PlayerLayout />,
  },
  {
    path: "/settings",
    element: <SettingsLayout />,
  },
], { basename: '/' });

export { router };
