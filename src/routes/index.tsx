import PlayerLayout from "@/layouts/PlayerLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PlayerLayout />,
  },
  {
    path: "settings",
    element: <SettingsLayout />,
  },
]);

export { router };
