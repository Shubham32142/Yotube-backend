import { useState } from "react";
import axios from "axios";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasChannel, setHasChannel] = useState(false); // State for checking if the user has a channel
  const [channelId, setChannelId] = useState(""); // State to store the channel ID

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      const response = await axios.post("http://localhost:3000/User/register", {
        username,
        email,
        password,
      });

      // Store the username and user ID in local storage
      localStorage.setItem("username", username);
      const userId = response.data.userId; // Assuming the response includes the user ID
      localStorage.setItem("userId", userId);

      // Check if the user has a channel
      await checkUserChannel(userId);

      // Redirect to login page after registration
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const checkUserChannel = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/channel/${userId}`);
      const data = await response.json();

      if (data.hasChannel) {
        // Update state to show "View Channel" button
        setHasChannel(true);
        // Store the channel ID
        setChannelId(data.channelId); // Assuming the response contains the channel ID
      } else {
        // Show "Create Channel" button
        setHasChannel(false);
      }
    } catch (error) {
      console.error("Error checking channel:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-24 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-gray-800 text-2xl mb-6">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-1 font-bold text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-bold text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 font-bold text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-red-600 text-white rounded-md font-bold hover:bg-red-700"
        >
          Register
        </button>
      </form>
      {hasChannel && (
        <div className="mt-4">
          <p className="text-gray-700">
            You have a channel! Channel ID: {channelId}
          </p>
          <button
            onClick={() => (window.location.href = `/viewChannel/${channelId}`)}
            className="mt-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            View Channel
          </button>
        </div>
      )}
    </div>
  );
}
export default Register;
