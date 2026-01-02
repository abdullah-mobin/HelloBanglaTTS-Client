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
  { to: "/modules/tts", label: "Text to Speech", icon: Mic },
  { to: "/modules/video", label: "Bangla Text to Video", icon: Video },
  { to: "/modules/image", label: "Bangla Text to Image", icon: Image },
  { to: "/modules/story", label: "Story Generator", icon: BookOpen },
  { to: "/modules/accent", label: "Regional Accent", icon: Languages },
  { to: "/modules/smartify", label: "Smartify Text", icon: Sparkles },
  { to: "/modules/humanize", label: "AI Humanizer", icon: UserCheck },
];

export default function LeftPanel() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r min-h-screen p-4">
      <div>        
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          HelloBanglaTTS
        </Link>

      </div>

      <nav className="flex flex-col gap-5 mt-10">
        {items.map(({ to, label, icon: Icon }) => (
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
