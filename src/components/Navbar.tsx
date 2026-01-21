import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Sparkles, Menu, X, User, LogOut, Mail, Calendar } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar({ }: { isModulePage: boolean }) {
  const { isLoggedIn, userProfile, fetchUserProfile, logout } = useAuth();
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileFetchedRef = useRef(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (isLoggedIn && !userProfile && !profileFetchedRef.current) {
      profileFetchedRef.current = true;
      fetchUserProfile().catch(err => console.error('Failed to fetch profile:', err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileMenuOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className={`fixed top-0 ${isLoggedIn ? 'md:left-64 left-0' : 'left-0'} right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* Mobile menu button */}
        {isLoggedIn && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        {/* Left Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <Link to="/pricing" className="hover:text-indigo-500">Pricing</Link>
          <Link to="/blog" className="hover:text-indigo-500">Blog</Link>
          <Link to="/about" className="hover:text-indigo-500">About</Link>
          <Link to="/career" className="hover:text-indigo-500">Career</Link>
          <Link to="/support" className="hover:text-indigo-500">Support</Link>
        </div>

        {/* 🔥 Center Upgrade Button */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <Link
            to="/pricing"
            className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                       text-white font-semibold shadow-lg
                       hover:scale-105 transition-transform duration-300"
          >
            {/* Glow Ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500
                             blur-md opacity-60 animate-pulse -z-10" />

            <Sparkles size={16} />
            Upgrade to Pro
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}

          {isLoggedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                  {userProfile?.name?.charAt(0).toUpperCase() || <User size={16} />}
                </div>
                <span className="hidden sm:inline text-sm">{userProfile?.name || 'User'}</span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  {/* Profile Card Header */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 text-2xl font-bold">
                        {userProfile?.name?.charAt(0).toUpperCase() || <User size={24} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{userProfile?.name}</h3>
                        <p className="text-indigo-100 text-sm">
                          {userProfile?.status === "active" ? "✓ Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="px-6 py-4 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <Mail size={18} className="text-indigo-600" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium truncate">{userProfile?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-indigo-600" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Member Since</p>
                        <p className="text-sm font-medium">
                          {userProfile?.created_at
                            ? new Date(userProfile.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Loading..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isLoggedIn && mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 space-y-4">
            <Link to="/" className="block hover:text-indigo-500">Home</Link>
            <Link to="/pricing" className="block hover:text-indigo-500">Pricing</Link>
            <Link to="/blog" className="block hover:text-indigo-500">Blog</Link>
            <Link to="/about" className="block hover:text-indigo-500">About</Link>
            <Link to="/career" className="block hover:text-indigo-500">Career</Link>
            <Link to="/support" className="block hover:text-indigo-500">Support</Link>
            <div className="border-t pt-4">
              <Link to="/modules/tts" className="block hover:text-indigo-500">Text to Speech</Link>
              {isLoggedIn && (
                <>
                  <Link to="/modules/video" className="block hover:text-indigo-500">Video Gen</Link>
                  <Link to="/modules/image" className="block hover:text-indigo-500">Image Gen</Link>
                  <Link to="/modules/story" className="block hover:text-indigo-500">Story Gen</Link>
                  <Link to="/modules/accent" className="block hover:text-indigo-500">Accent Translate</Link>
                  <Link to="/modules/smartify" className="block hover:text-indigo-500">Smartify Text</Link>
                  <Link to="/modules/humanize" className="block hover:text-indigo-500">Humanizer</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
