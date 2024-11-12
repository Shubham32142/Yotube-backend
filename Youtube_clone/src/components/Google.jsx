import { useState } from "react";
import axios from "axios";

export function Google() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://youtube-backend-zdni.onrender.com/User/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username); // Store token
      // Redirect to home or update state to show user name
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center w-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="mb-6 text-center text-gray-800 text-2xl">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:border-blue-500 focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:border-blue-500 focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md text-base transition-colors duration-300 hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
export default Google;
