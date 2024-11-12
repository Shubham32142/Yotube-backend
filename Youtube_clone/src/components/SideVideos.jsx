/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import allUsers from "./allUsers";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export function SideVideos() {
  const { channelId } = useParams();
  const { users, loading, error } = allUsers(); // Assuming `allUsers()` is a custom hook that fetches users
  const [channel, setChannel] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios(
          `https://youtube-backend-zdni.onrender.com/User/byChannel/${channelId}`
        );
        setUserId(response.data);
        if (response.data.channelId) {
          fetchChannel(response.data.channelId);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    async function fetchChannel(channelId) {
      try {
        const response = await axios(
          `https://youtube-backend-zdni.onrender.com/channel/${channelId}`
        );
        setChannel(response.data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    }

    fetchUser();
  }, [channelId]);

  if (loading) return <p className="text-center text-blue-500">Loading.....</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-[400px] w-full mx-auto mr-24 flex flex-col">
      <div className="flex flex-col gap-3">
        {users &&
          users.map((user) => (
            <div
              key={user._id}
              className="flex gap-2 pb-3 border-b border-gray-300"
            >
              <Link
                to={`/User/byChannel/${user.channelId}`}
                key={user.channelId}
                className="flex no-underline text-black"
              >
                <img
                  src={user.thumbnailUrl}
                  alt={user.title}
                  className="w-full h-auto max-w-[168px] object-cover"
                />
                <div className="flex-grow ml-2">
                  <p className="text-sm font-bold mb-1 truncate">
                    {user.title}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {channel?.channelName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.views} views • 1 month ago
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
