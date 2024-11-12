import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Channel = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState("");
  const [subscribers, setSubscribers] = useState(0);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const { channelId } = useParams(); // Get channelId from URL params

  // Effect to fetch channel data if the channelId exists
  useEffect(() => {
    const fetchChannelData = async () => {
      if (channelId) {
        try {
          const response = await axios.get(
            `https://youtube-backend-zdni.onrender.com/channel/${channelId}`
          );
          setChannel(response.data);
          setName(response.data.name);
          setHandle(response.data.handle);
          setDescription(response.data.description);
          setSubscribers(response.data.subscribers);
        } catch (error) {
          console.error("Error fetching channel data:", error);
        }
      }
    };
    fetchChannelData();
  }, [channelId]);

  const handlePictureSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file); // Store the file object for upload
    }
  };

  const handleCreateChannel = async () => {
    setError(""); // Reset error state
    setSuccess(""); // Reset success state

    const formData = new FormData();
    formData.append("channelName", name);
    formData.append("handle", handle);
    formData.append("channelBanner", profilePicture);
    formData.append("subscribers", subscribers);
    formData.append("userId", userId);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `https://youtube-backend-zdni.onrender.com/createChannel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type for file uploads
          },
        }
      );
      setChannel(response.data.channel); // Save channel data
      setSuccess(response.data.message); // Set success message
      navigate(`/viewChannel/${response.data.channel.channelId}`); // Redirect to view channel
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong"); // Handle errors
    }
  };

  return (
    <div className="w-[97vw] flex justify-center p-4">
      <div className="w-full max-w-[400px] bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">
          {channel ? "Edit Your Channel" : "Create Your Channel"}
        </h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <div className="flex flex-col items-center mb-4">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2">
              No Image Selected
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureSelection}
            className="mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="handle" className="block mb-1 text-sm font-medium">
            Handle
          </label>
          <input
            type="text"
            id="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleCreateChannel}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {channel ? "Update Channel" : "Create Channel"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
