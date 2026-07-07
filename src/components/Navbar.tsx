import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  Mail,
  Calendar,
  Play,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Brand from "./Brand";

export default function Navbar({
  isModulePage: _isModulePage,
  sidebarWidth = 0,
}: {
  isModulePage: boolean;
  sidebarWidth?: number;
}) {
  const { isLoggedIn, userProfile, fetchUserProfile, logout } = useAuth();
  const [dark] = useState(false);
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
      fetchUserProfile().catch((err) => console.error("Failed to fetch profile:", err));
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
      console.error("Logout failed:", err);
    }
  };

  // Public nav links shown to logged-out users
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/career", label: "Career" },
    { to: "/support", label: "Support" },
  ];

  return (
    <nav
      style={{ left: `${sidebarWidth}rem` }}
      className="fixed top-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800 transition-[left] duration-300 ease-in-out"
    >
      <div className="max-w-7xl mx-auto pl-2 pr-6 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-6 relative">
        {/* ============= LEFT ============= */}
        <div className="flex items-center gap-4 justify-self-start min-w-0 relative z-10">
          {/* Mobile menu trigger (logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          {/* Brand — hidden when the LeftPanel is showing the logo */}
          {!isLoggedIn && (
            <Link to="/" className="shrink-0">
              <Brand size="sm" />
            </Link>
          )}

          {/* Public links (desktop) */}
          {!isLoggedIn && (
            <div className="hidden xl:flex items-center gap-5 font-medium text-sm min-w-0">
              {publicLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="hover:text-indigo-500 transition whitespace-nowrap">
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Compact links for mid-size screens */}
          {!isLoggedIn && (
            <div className="hidden md:flex xl:hidden items-center gap-3 font-medium text-sm min-w-0">
              <Link to="/" className="hover:text-indigo-500 transition">Home</Link>
              <Link to="/pricing" className="hover:text-indigo-500 transition">Pricing</Link>
              <Link to="/blog" className="hover:text-indigo-500 transition">Blog</Link>
              <Link to="/about" className="hover:text-indigo-500 transition">About</Link>
              <Link to="/career" className="hover:text-indigo-500 transition">Career</Link>
              <Link to="/support" className="hover:text-indigo-500 transition">Support</Link>
            </div>
          )}

          {/* Logged-in compact home link (desktop) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link to="/" className="hover:text-indigo-500 transition">
                Home
              </Link>
              <Link to="/pricing" className="hover:text-indigo-500 transition">
                Pricing
              </Link>
            </div>
          )}
        </div>

        {/* ============= CENTER ============= */}
        <div className="flex items-center justify-center min-w-0 relative z-10 justify-self-center">
          {/* Logged-out: a single "Try TTS Free" CTA */}
          {!isLoggedIn && (
            <Link
              to="/modules/tts"
              className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                         text-white font-semibold shadow-lg
                         hover:scale-105 transition-transform duration-300"
            >
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500
                           blur-md opacity-60 animate-pulse -z-10"
              />
              <Play size={14} className="fill-white" />
              Try TTS Free
            </Link>
          )}

          {/* Logged-in: single Upgrade CTA */}
          {isLoggedIn && (
            <Link
              to="/pricing"
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                         text-white font-semibold shadow-lg
                         hover:scale-105 transition-transform duration-300"
            >
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500
                           blur-md opacity-60 animate-pulse -z-10"
              />
              <Sparkles size={14} />
              Upgrade to Pro
            </Link>
          )}
        </div>

        {/* ============= RIGHT ============= */}
        <div className="flex items-center gap-3 justify-self-end min-w-0 relative z-10">
          {isLoggedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {userProfile?.name?.charAt(0).toUpperCase() || <User size={14} />}
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {userProfile?.name || "User"}
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
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
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
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
                  <div className="px-6 py-4 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold transition"
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
                className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-semibold transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold transition shadow-lg shadow-indigo-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ============= MOBILE MENU ============= */}
      {isLoggedIn && mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-3">
            <Link to="/" className="block hover:text-indigo-500">
              Home
            </Link>
            <Link to="/pricing" className="block hover:text-indigo-500">
              Pricing
            </Link>
            <Link to="/blog" className="block hover:text-indigo-500">
              Blog
            </Link>
            <Link to="/about" className="block hover:text-indigo-500">
              About
            </Link>
            <Link to="/career" className="block hover:text-indigo-500">
              Career
            </Link>
            <Link to="/support" className="block hover:text-indigo-500">
              Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
