import Chat from "../../features/chats/ui/pages/Chat";
import HomePage from "../../features/dashboard/ui/pages/HomePage";
import Setting from "../../features/settings/ui/pages/Setting";

export const commonRoutes = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "settings",
    element: <Setting />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
];
