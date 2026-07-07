import { useState } from "react";
import Brand from "../components/Brand";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Mic, ArrowRight, Sparkles, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordValid = password.length >= 6;
  const passwordsMatch = password === confirm;
  const formValid = name && email && passwordValid && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true);
    setError("");
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate("/");
    } catch (err) {
      setError("Google login failed. Please try again.");
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
            Give your Bangla content a{" "}
            <span className="underline decoration-white/40 decoration-4 underline-offset-8">
              human voice
            </span>
            .
          </h1>
          <p className="text-white/90 text-lg mb-8 max-w-md">
            Join thousands of creators, developers, and educators using
            HelloBanglaTTS to bring Bangla AI to life.
          </p>

          <div className="space-y-3 max-w-md">
            {[
              "Free Bangla TTS — no signup required",
              "7 AI modules: TTS, video, image, story, accent, smartify, humanizer",
              "Regional accent support for 9+ Bangladeshi dialects",
              "Production-ready REST APIs",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={12} />
                </div>
                <span className="text-white/95 text-sm font-medium">
                  {perk}
                </span>
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
              Create your account
            </h2>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Log in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Google */}
          <div className="mb-5">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error("Google login failed")}
              theme="outline"
              size="large"
              width="100%"
              text="signup_with"
            />
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Abdullah Mobin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

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
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl border bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    password && !passwordValid
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && !passwordValid && (
                <p className="text-xs text-red-500 mt-1.5">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmVisible ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`w-full p-3 rounded-xl border bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    confirm && !passwordsMatch
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setConfirmVisible(!confirmVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {confirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirm && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1.5">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!formValid || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-200"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <Mic size={18} />
                  Create Account
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
