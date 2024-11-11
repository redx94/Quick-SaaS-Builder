import { Home, Settings, User, Bug } from "lucide-react";
import SocraticDebugger from "./components/SocraticDebugger";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <div>Home Page</div>
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
    page: <div>Settings Page</div>
  },
  {
    title: "Profile",
    to: "/profile",
    icon: User,
    page: <div>Profile Page</div>
  },
  {
    title: "Debug",
    to: "/debug",
    icon: Bug,
    page: <SocraticDebugger />
  }
];