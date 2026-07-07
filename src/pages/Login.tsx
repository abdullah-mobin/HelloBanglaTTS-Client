import Brand from "../components/Brand";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { ArrowRight, Lock, Mic } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      {/* LEFT — Brand panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-12 flex-col justify-between">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

        <Brand
          size="md"
          className="relative z-10 [&_span]:!text-white [&_div]:!shadow-none"
        />

        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-4 leading-tight">
            Welcome back to{" "}
            <span className="underline decoration-white/40 decoration-4 underline-offset-8">
              HelloBanglaTTS
            </span>
            .
          </h1>
          <p className="text-white/90 text-lg mb-8 max-w-md">
            Log in to access your dashboard, continue where you left off, and
            unlock your premium Bangla voices.
          </p>

          <div className="space-y-3 max-w-md text-sm text-white/90">
            <p className="font-semibold">What you'll get:</p>
            {[
              "Unified dashboard for all 7 modules",
              "Premium voices (Saifa, Robin)",
              "Higher quality & faster generations",
              "Commercial usage rights",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {perk}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/70 text-xs">
          © {new Date().getFullYear()} HelloBanglaTTS · Made in Bangladesh
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute top-6 right-6 lg:hidden">
          <Brand size="sm" />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">
              Log in
            </h2>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Sign up free
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-200"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <Mic size={18} />
                  Log In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6 flex items-center justify-center gap-1.5">
            <Lock size={12} /> Your data is encrypted and never shared.
          </p>
        </div>
      </div>
    </div>
  );
}
