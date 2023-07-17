import { createBrowserRouter } from "react-router-dom";
import PlayerLayout from "@/layouts/PlayerLayout";
import SettingsLayout from "@/layouts/SettingsLayout";

const router = createBrowserRouter([
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
