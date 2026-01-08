import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-sky-50 text-gray-900">

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Login to Your Account
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
