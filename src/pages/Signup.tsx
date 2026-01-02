import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log("Google Token:", credentialResponse.credential);
    // send token to backend
  };

  // Simple password validation
  const passwordValid = password.length >= 6;
  const passwordsMatch = password === confirm;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Create an Account
          </h1>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg border dark:bg-gray-800"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border dark:bg-gray-800"
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
