import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // renamed from "Google"
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ────────────────────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://youtube-backend-zdni.onrender.com/User/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };
  /* ────────────────────────────────────────────── */

  return (
    <section
      className="max-w-md mx-auto my-20 px-8 py-10
                        bg-skin-base text-skin-text rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Welcome back</h2>
      <p className="text-center text-skin-sub mb-8">Sign in to your account</p>

      {error && (
        <div
          className="mb-6 p-3 rounded-md bg-red-50 dark:bg-red-900/20
                        text-red-700 dark:text-red-400 text-sm"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-skin-muted
                       border border-gray-300 dark:border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-colors"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-skin-muted
                       border border-gray-300 dark:border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-colors"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md font-semibold
                     bg-blue-600 hover:bg-blue-700 text-white
                     transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <hr className="my-8 border-gray-300 dark:border-zinc-700" />

      {/* Register prompt */}
      <p className="text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Create one
        </Link>
      </p>
    </section>
  );
}
