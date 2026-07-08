import { NavLink } from "react-router-dom";
import {
  Mic,
  // Video,
  Image,
  BookOpen,
  Languages,
  Sparkles,
  UserCheck,
  ChevronsLeft,
  ChevronsRight,
  Code2,
  Workflow,
} from "lucide-react";
import Brand from "./Brand";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const LEFT_PANEL_WIDTH_EXPANDED = 16; // rem (w-64)
export const LEFT_PANEL_WIDTH_COLLAPSED = 5; // rem (w-20)

const items = [
  { to: "/modules/tts", label: "Text to Speech", icon: Mic, always: true },
  // { to: "/modules/video", label: "Bangla Text to Video", icon: Video, always: false },
  { to: "/modules/image", label: "Bangla Text to Image", icon: Image, always: false },
  { to: "/modules/story", label: "Story Generator", icon: BookOpen, always: false },
  { to: "/modules/accent", label: "Quick Translate", icon: Languages, always: false },
  { to: "/modules/smartify", label: "Smartify Text", icon: Sparkles, always: false },
  { to: "/modules/humanize", label: "AI Humanizer", icon: UserCheck, always: false },
  { to: "/api-docs", label: "API Docs", icon: Code2, always: true },
  { to: "/how-it-works", label: "How It Works", icon: Workflow, always: true },
  { to: "/user-manual", label: "User Manual", icon: BookOpen, always: true },
];

interface LeftPanelProps {
  isLoggedIn: boolean;
  collapsed: boolean;
  onToggle: () => void;
}

export default function LeftPanel({ isLoggedIn, collapsed, onToggle }: LeftPanelProps) {
  const visibleItems = items.filter((item) => item.always || isLoggedIn);
  const { userProfile } = useAuth();

  // Read mounted state so the slide-in transition runs after first paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(t);
  }, []);

  return (
    <aside
      className={`hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen z-40
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-[width] duration-300 ease-in-out
        ${collapsed ? "md:w-20" : "md:w-64"}
        ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header: brand + collapse toggle */}
      <div
        className={`flex items-center px-4 pt-5 pb-4 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className="overflow-hidden">
          {collapsed ? (
            <Brand size="sm" withText={false} />
          ) : (
            <Brand size="sm" />
          )}
        </div>

        {!collapsed && (
          <button
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
          >
            <ChevronsLeft size={16} />
          </button>
        )}
      </div>

      {/* When collapsed, show the expand toggle as a centered icon below the brand */}
      {collapsed && (
        <div className="flex justify-center pb-3">
          <button
            onClick={onToggle}
            aria-label="Expand sidebar"
            className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto pb-4">
        {visibleItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl transition-all duration-200
               font-medium text-sm
               ${collapsed ? "justify-center h-11 w-11 mx-auto" : "px-4 py-3"}
               ${
                 isActive
                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                   : "text-gray-600 hover:bg-gray-100"
               }`
            }
          >
            <Icon size={18} className="shrink-0" />

            {/* Label */}
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              {label}
            </span>

            {/* Tooltip on hover when collapsed */}
            {collapsed && (
              <span
                className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-lg
                           bg-gray-900 text-white text-xs font-medium whitespace-nowrap
                           opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-200 z-50 shadow-lg"
              >
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer: user info / collapsed avatar */}
      <div
        className={`border-t border-gray-200 dark:border-gray-800 p-3 ${
          collapsed ? "flex justify-center" : ""
        }`}
      >
        {userProfile ? (
          collapsed ? (
            <div
              title={userProfile.name}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                         flex items-center justify-center text-white font-bold text-sm shadow-md"
            >
              {userProfile.name?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition cursor-default">
              <div
                className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                           flex items-center justify-center text-white font-bold shadow-md"
              >
                {userProfile.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{userProfile.name}</p>
                <p className="text-xs text-gray-500 truncate">{userProfile.email}</p>
              </div>
            </div>
          )
        ) : (
          !collapsed && (
            <div className="px-2 py-2 text-xs text-gray-400">Signed in</div>
          )
        )}
      </div>
    </aside>
  );
}
