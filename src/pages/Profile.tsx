import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import { LogOut, User, Mail, Calendar } from "lucide-react";

export default function Profile() {
  const { userProfile, fetchUserProfile, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        await fetchUserProfile();
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isLoggedIn, fetchUserProfile, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Go Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <p className="text-gray-500">No profile data available</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={40} />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-gray-500">
                {userProfile.status === "active" ? "✓ Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="border-b pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-indigo-600" />
                <label className="text-sm font-medium text-gray-500">Email</label>
              </div>
              <p className="text-lg">{userProfile.email}</p>
            </div>

            {/* Created At */}
            <div className="border-b pb-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar size={20} className="text-indigo-600" />
                <label className="text-sm font-medium text-gray-500">
                  Member Since
                </label>
              </div>
              <p className="text-lg">
                {new Date(userProfile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* User ID */}
            <div className="border-b pb-4">
              <label className="text-sm font-medium text-gray-500">User ID</label>
              <p className="text-sm font-mono text-gray-600 dark:text-gray-400 break-all">
                {userProfile.id}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
