import { useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordValid && passwordsMatch) {
      try {
        await register(name, email, password);
        navigate("/");
      } catch (err) {
        setError("Registration failed. Please try again.");
      }
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

  // Simple password validation
  const passwordValid = password.length >= 6;
  const passwordsMatch = password === confirm;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Create an Account
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800"
              required
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 rounded-lg border dark:bg-gray-800 pr-10 ${
                  password && !passwordValid ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {password && !passwordValid && (
                <p className="text-xs text-red-500 mt-1">Min 6 characters</p>
              )}
            </div>

            {/* Confirm Password with toggle */}
            <div className="relative">
              <input
                type={confirmVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`w-full p-3 rounded-lg border dark:bg-gray-800 pr-10 ${
                  confirm && !passwordsMatch ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setConfirmVisible(!confirmVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {confirmVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {confirm && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Primary Sign Up */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              Sign Up
            </button>
          </form>

          {/* Google button */}
          <div className="mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error("Google login failed")}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          <p className="text-sm text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
