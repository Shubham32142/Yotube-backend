import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasChannel, setHasChannel] = useState(false);
  const [channelId, setChannelId] = useState("");

  /* ────────────────────────────────────────────── */
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://youtube-backend-zdni.onrender.com/User/register",
        { username, email, password }
      );

      localStorage.setItem("username", username);
      localStorage.setItem("userId", data.userId);

      await checkUserChannel(data.userId);

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const checkUserChannel = async (userId) => {
    try {
      const res = await fetch(
        `https://youtube-backend-zdni.onrender.com/channel/${userId}`
      );
      const data = await res.json();

      setHasChannel(data.hasChannel);
      if (data.hasChannel) setChannelId(data.channelId);
    } catch (err) {
      console.error("Error checking channel:", err);
    }
  };
  /* ────────────────────────────────────────────── */

  return (
    <section
      className="max-w-md mx-auto my-20 px-8 py-10
                        bg-skin-base text-skin-text rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-8">
        Create your account
      </h2>

      <form onSubmit={handleRegister} className="space-y-6">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-skin-muted
                       border border-gray-300 dark:border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

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
                       focus:outline-none focus:ring-2 focus:ring-red-500"
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
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-md font-semibold
                     bg-red-600 hover:bg-red-700 text-white
                     transition-colors"
        >
          Register
        </button>
      </form>

      {/* Channel info */}
      {hasChannel && (
        <div className="mt-6 p-4 rounded-md bg-skin-muted">
          <p className="mb-3">
            You already have a channel! <br />
            Channel ID: <span className="font-semibold">{channelId}</span>
          </p>
          <button
            onClick={() => navigate(`/viewChannel/${channelId}`)}
            className="py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700
                       text-white font-medium"
          >
            View Channel
          </button>
        </div>
      )}

      {/* Divider */}
      <hr className="my-8 border-gray-300 dark:border-zinc-700" />

      {/* Login prompt */}
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-red-600 hover:underline font-medium">
          Log In
        </Link>
      </p>
    </section>
  );
}
