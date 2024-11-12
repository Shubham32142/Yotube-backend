import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  const [channelId, setChannelId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      const checkChannel = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/channel/name/${storedUsername}`
          );
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setHasChannel(data.hasChannel);
            if (data.hasChannel) {
              const channelResponse = await fetch(
                `http://localhost:3000/channel/name/${storedUsername}`
              );
              const data = await channelResponse.json();
              setChannelId(data.channelId);
            }
          }
        } catch (error) {
          console.error("Error checking channel:", error);
        }
      };
      checkChannel();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setHasChannel(false);
    setUsername("");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleViewChannel = () => {
    navigate(`/viewChannel/${channelId}`);
  };

  const handleCreateChannel = () => {
    if (username) {
      navigate(`/createChannel`);
    } else {
      alert("You must be logged in to create a channel.");
    }
  };

  return (
    <div className="relative flex items-center">
      <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
      {username ? (
        <>
          <button
            onClick={toggleDropdown}
            className="ml-5 py-2 px-4 bg-gray-500 text-white rounded-full cursor-pointer"
          >
            {username.charAt(0)}
          </button>
          {dropdownVisible && (
            <div className="absolute top-12 right-10 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-6 w-40">
              {hasChannel ? (
                <button
                  onClick={handleViewChannel}
                  className="block w-full text-left py-1 text-gray-700 hover:text-blue-600"
                >
                  View Channel
                </button>
              ) : (
                <button
                  onClick={handleCreateChannel}
                  className="block w-full text-left py-1 text-gray-700 hover:text-blue-600"
                >
                  Create Channel
                </button>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left py-1 mt-2 text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/register"
          className="ml-7 px-4 py-2 border border-gray-300 rounded-full text-blue-500 font-semibold hover:bg-blue-100 flex items-center"
        >
          <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
          Sign in
        </Link>
      )}
    </div>
  );
}
