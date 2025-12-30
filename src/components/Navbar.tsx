import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          helloBanglaTTS
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/about" className="hover:text-indigo-500">
            About
          </Link>
          <Link to="/career" className="hover:text-indigo-500">
            Career
          </Link>
          <Link to="/pricing" className="hover:text-indigo-500">
            Pricing
          </Link>
          <Link to="/blog" className="hover:text-indigo-500">
            Blog
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
