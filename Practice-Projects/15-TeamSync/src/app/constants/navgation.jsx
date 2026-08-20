import {
  Building,
  File,
  LayoutDashboard,
  List,
  MessageCircle,
  PersonStanding,
  Presentation,
  Settings,
  User,
} from "lucide-react";

export const employeeNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/home/myTask",
    title: "My Task",
    icon: <List />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    icon: <MessageCircle />,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    icon: <Presentation />,
  },
  {
    path: "/home/profile",
    title: "Profile",
    icon: <User />,
  },
  {
    path: "/home/settings",
    title: "Settings",
    icon: <Settings />,
  },
];
export const adminNavigation = [
  {
    path: "/home",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/home/task",
    title: "Task",
    icon: <List />,
  },
  {
    path: "/home/chat",
    title: "Chats",
    icon: <MessageCircle />,
  },
  {
    path: "/home/employee",
    title: "Employee",
    icon: <PersonStanding />,
  },
  {
    path: "/home/departments",
    title: "Departments",
    icon: <Building />,
  },
  {
    path: "/home/documents",
    title: "Documents",
    icon: <File />,
  },
  {
    path: "/home/settings",
    title: "Settings",
    icon: <Settings />,
  },
];
