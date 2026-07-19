import { motion } from "motion/react";
import {
  Home,
  Calendar,
  Monitor,
  LayoutGrid,
  Zap,
  User,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
const navItems = [
  { id: "home", icon: Home, label: "Home", path: "/" },
  { id: "events", icon: Calendar, label: "Events", path: "/events" },
  { id: "digital", icon: Monitor, label: "Digital", path: "/digital" },
  {
    id: "exhibition",
    icon: LayoutGrid,
    label: "Exhibition",
    path: "/exhibition",
  },
  { id: "activation", icon: Zap, label: "Activate", path: "/activation" },
  { id: "presence", icon: Globe, label: "Presence", path: "#" },
  { id: "profile", icon: User, label: "Profile", path: "/profile" },
];

export function MobileBottomNav({ activeSection, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center h-16 bg-white/97 backdrop-blur-md border-t border-black/[0.08] pb-[env(safe-area-inset-bottom,0px)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <Link
            to={item.path}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative h-full ${
              isActive ? "text-[#2C7048]" : "text-[#8e8e93]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full w-5 h-0.5"
              />
            )}
            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            <span
              className={`text-[10px] ${isActive ? "font-semibold" : "font-normal"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
