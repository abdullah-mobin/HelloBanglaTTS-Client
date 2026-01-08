import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Mic,
  Video,
  Image,
  BookOpen,
  Languages,
  Sparkles,
  UserCheck,
} from "lucide-react";

const items = [
  { to: "/modules/tts", label: "Text to Speech", icon: Mic, always: true },
  { to: "/modules/video", label: "Bangla Text to Video", icon: Video, always: false },
  { to: "/modules/image", label: "Bangla Text to Image", icon: Image, always: false },
  { to: "/modules/story", label: "Story Generator", icon: BookOpen, always: false },
  { to: "/modules/accent", label: "Regional Accent", icon: Languages, always: false },
  { to: "/modules/smartify", label: "Smartify Text", icon: Sparkles, always: false },
  { to: "/modules/humanize", label: "AI Humanizer", icon: UserCheck, always: false },
];

export default function LeftPanel({ isLoggedIn }: { isLoggedIn: boolean }) {
  const visibleItems = items.filter(item => item.always || isLoggedIn);

  return (
    <aside className="hidden md:fixed md:left-0 md:top-0 md:w-64 md:h-screen bg-white dark:bg-gray-900 border-r p-4 md:flex md:flex-col">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          HelloBanglaTTS
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-5 mt-10 overflow-y-auto">
        {visibleItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
               ${
                 isActive
                   ? "bg-indigo-600 text-white"
                   : "hover:bg-gray-100 dark:hover:bg-gray-800"
               }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
