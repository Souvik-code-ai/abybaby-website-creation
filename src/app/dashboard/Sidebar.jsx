import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  Monitor,
  LayoutGrid,
  Zap,
  Globe,
  MessageSquare,
  User,
  MoreHorizontal,
} from "lucide-react";
import logo from "../../assets/images/logo.jpg";
// interface SidebarProps {
//   activeSection: string;
//   onNavigate: (section: string) => void;
//   onMoreClick: () => void;
// }

const allNavItems = [
  { id: "home", icon: Home, label: "Home", path: "/" },
  { id: "events", icon: Calendar, label: "Events", path: "/events" },
  { id: "digital", icon: Monitor, label: "Digital", path: "/digital" },
  {
    id: "exhibition",
    icon: LayoutGrid,
    label: "Exhibition",
    path: "/exhibition",
  },
  { id: "activation", icon: Zap, label: "Activation", path: "/activation" },
  { id: "presence", icon: Globe, label: "Presence", path: "/presence" },
  // { id: "messages", icon: MessageSquare, label: "Messages", path: "/messages" },
  { id: "profile", icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar({ activeSection, onNavigate, onMoreClick }) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isPathActive = (path) => location.pathname === path;

  return (
    <motion.aside
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      animate={{ width: expanded ? 260 : 72 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-white overflow-hidden"
    >
      <nav className="flex flex-col py-3 px-3 flex-1">
        {/* Logo row */}
        <Link
          to={"/"}
          onClick={() => onNavigate("/")}
          className="relative flex items-center rounded-xl transition-all duration-150 shrink-0 h-11 px-[10px] py-0"
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div className="shrink-0 rounded-xl flex items-center justify-center cursor-pointer bg-[linear-gradient(135deg,var(--accent)_0%,#f9a8c9_100%)]">
            <img
              src={logo}
              alt=""
              className="overflow-hidden rounded-lg h-12 w-12 border-r border-b border-black"
            />
          </div>
        </Link>

        {/* 8 nav items — centered vertically with flex-1 above and below */}
        <div className="flex-1" />
        <div className="flex flex-col gap-1">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isPathActive(item.path);
            const isProfile = item.id === "profile";

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => {
                  // if (item.id === "presence") {
                  //   e.preventDefault();
                  //   onNavigate("presence");
                  //   return;
                  // }

                  onNavigate(item.id);
                }}
                className={`relative flex items-center rounded-xl transition-all duration-150 shrink-0 h-11 px-[10px] py-0 ${
                  isActive
                    ? "bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[color:var(--accent)]"
                    : "bg-transparent text-[color:var(--foreground)] hover:bg-black/[0.04]"
                }`}
              >
                <div className="shrink-0 flex items-center justify-center w-7 h-7">
                  {isProfile ? (
                    /* Profile shows avatar circle instead of plain icon */
                    <div
                      className={`rounded-full flex items-center justify-center w-[26px] h-[26px] text-[10px] font-bold font-[family-name:var(--font-family-body)] ${
                        isActive
                          ? "bg-[linear-gradient(135deg,var(--accent)_0%,#f9a8c9_100%)] text-white"
                          : "bg-[color:var(--muted)] text-[color:var(--muted-foreground)]"
                      }`}
                    >
                      <img src={logo} alt="" />
                    </div>
                  ) : (
                    <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                  )}
                </div>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className={`ml-3 whitespace-nowrap overflow-hidden text-[15px] font-[family-name:var(--font-family-body)] ${
                        isActive ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
        <div className="flex-1" />

        {/* More — pinned to bottom */}
        <button
          onClick={onMoreClick}
          className="relative flex items-center rounded-xl transition-all duration-150 shrink-0 h-11 px-[10px] py-0 text-[color:var(--foreground)]"
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div className="shrink-0 flex items-center justify-center w-7 h-7">
            <MoreHorizontal size={22} strokeWidth={1.8} />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="ml-3 whitespace-nowrap overflow-hidden text-[15px] font-[family-name:var(--font-family-body)]"
              >
                More
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>
    </motion.aside>
  );
}
