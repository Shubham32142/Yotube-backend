import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faUser,
  faAt,
  faFileText,
  faUsers,
  faArrowLeft,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Channel = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState("");
  const [subscribers, setSubscribers] = useState(0);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { channelId } = useParams();

  // Effect to fetch channel data if channelId exists
  useEffect(() => {
    const fetchChannelData = async () => {
      if (channelId) {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://youtube-backend-zdni.onrender.com/channel/${channelId}`
          );
          setChannel(response.data);
          setName(response.data.name);
          setHandle(response.data.handle);
          setDescription(response.data.description);
          setSubscribers(response.data.subscribers);
        } catch (error) {
          setError("Failed to load channel data");
          console.error("Error fetching channel data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchChannelData();
  }, [channelId]);

  const handlePictureSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setProfilePicture(file);
      setError("");
    }
  };

  const handleCreateChannel = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) {
      setError("Channel name is required");
      return;
    }
    if (!handle.trim()) {
      setError("Handle is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setLoading(true);

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
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setChannel(response.data.channel);
      setSuccess(response.data.message);

      setTimeout(() => {
        navigate(`/viewChannel/${response.data.channel.channelId}`);
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !name) {
    return (
      <div className="min-h-screen bg-skin-base flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-skin-text text-sm sm:text-base">
            Loading channel data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skin-base">
      {/* Mobile-first responsive container */}
      <div className="w-full px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-sm mx-auto sm:max-w-md lg:max-w-2xl">
          {/* Header - responsive spacing */}
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-skin-sub hover:text-skin-text transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-sm sm:text-base"
              />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-skin-text mb-1 sm:mb-2">
              {channel ? "Edit Your Channel" : "Create Your Channel"}
            </h1>
            <p className="text-skin-sub text-sm sm:text-base">
              {channel
                ? "Update your channel information"
                : "Set up your channel to start sharing content"}
            </p>
          </div>

          {/* Alert Messages - responsive */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl">
              <div className="flex items-start gap-2 sm:gap-3">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-red-500 text-sm sm:text-base mt-0.5"
                />
                <p className="text-red-700 dark:text-red-400 text-sm sm:text-base leading-relaxed">
                  {error}
                </p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl">
              <div className="flex items-start gap-2 sm:gap-3">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 text-sm sm:text-base mt-0.5"
                />
                <p className="text-green-700 dark:text-green-400 text-sm sm:text-base leading-relaxed">
                  {success}
                </p>
              </div>
            </div>
          )}

          {/* Form Card - fully responsive */}
          <div className="bg-skin-muted rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
            {/* Profile Picture Section - responsive sizing */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="relative inline-block">
                {profilePicture ? (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Channel Preview"
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover border-2 sm:border-4 border-white dark:border-zinc-700 shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-2xl sm:text-3xl lg:text-4xl text-white"
                    />
                  </div>
                )}

                <label className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 lg:bottom-2 lg:right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 sm:p-2.5 lg:p-3 cursor-pointer transition-colors shadow-lg">
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="text-xs sm:text-sm"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureSelection}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-skin-sub px-2">
                Upload your channel profile picture (max 5MB)
              </p>
            </div>

            {/* Form Fields - responsive spacing */}
            <div className="space-y-4 sm:space-y-6">
              {/* Channel Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-skin-text mb-2"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-red-500 text-xs sm:text-sm"
                  />
                  Channel Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your channel name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-skin-base border border-gray-300 dark:border-zinc-600 
                           rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           text-skin-text placeholder-skin-sub transition-colors text-sm sm:text-base"
                />
              </div>

              {/* Handle */}
              <div>
                <label
                  htmlFor="handle"
                  className="block text-sm font-semibold text-skin-text mb-2"
                >
                  <FontAwesomeIcon
                    icon={faAt}
                    className="mr-2 text-red-500 text-xs sm:text-sm"
                  />
                  Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-skin-sub text-sm sm:text-base">
                    @
                  </span>
                  <input
                    type="text"
                    id="handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="your-channel-handle"
                    className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-skin-base border border-gray-300 dark:border-zinc-600 
                             rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                             text-skin-text placeholder-skin-sub transition-colors text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-skin-text mb-2"
                >
                  <FontAwesomeIcon
                    icon={faFileText}
                    className="mr-2 text-red-500 text-xs sm:text-sm"
                  />
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about your channel..."
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-skin-base border border-gray-300 dark:border-zinc-600 
                           rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           text-skin-text placeholder-skin-sub transition-colors resize-none text-sm sm:text-base"
                />
              </div>

              {/* Subscribers (if editing) */}
              {channel && (
                <div>
                  <label
                    htmlFor="subscribers"
                    className="block text-sm font-semibold text-skin-text mb-2"
                  >
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="mr-2 text-red-500 text-xs sm:text-sm"
                    />
                    Subscribers
                  </label>
                  <input
                    type="number"
                    id="subscribers"
                    value={subscribers}
                    onChange={(e) =>
                      setSubscribers(parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-skin-base border border-gray-300 dark:border-zinc-600 
                             rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                             text-skin-text transition-colors text-sm sm:text-base"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons - stacked on mobile, side-by-side on larger screens */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-zinc-700">
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleCreateChannel}
                  disabled={loading}
                  className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl 
                           transition-colors text-sm sm:text-base
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                           focus:ring-offset-skin-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>{channel ? "Update Channel" : "Create Channel"}</span>
                  )}
                </button>

                <button
                  onClick={() => navigate("/")}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 dark:border-zinc-600 
                           text-skin-text rounded-lg sm:rounded-xl hover:bg-skin-muted transition-colors
                           text-sm sm:text-base disabled:opacity-50
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                           focus:ring-offset-skin-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
