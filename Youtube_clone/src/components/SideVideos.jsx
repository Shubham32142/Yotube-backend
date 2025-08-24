/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useAllUsers from "./useAllUsers";

export default function SideVideos() {
  const { channelId } = useParams();
  const { users, loading } = useAllUsers();

  const [channel, setChannel] = useState(null);

  /* fetch current channel once */
  useEffect(() => {
    async function fetchChannel() {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-zdni.onrender.com/channel/${channelId}`
        );
        setChannel(data);
      } catch (err) {
        console.error("Error fetching channel:", err);
      }
    }
    fetchChannel();
  }, [channelId]);

  if (loading) return <p className="text-center">Loading…</p>;

  // Show five random videos that are NOT the current one
  const recommended = users
    .filter((u) => u.channelId !== channelId)
    .slice(0, 5);

  return (
    <ul className="space-y-4">
      {recommended.map((user) => (
        <li key={user._id} className="flex gap-3">
          <Link
            to={`/User/byChannel/${user.channelId}`}
            className="flex-shrink-0"
          >
            <img
              src={user.thumbnailUrl}
              alt={user.title}
              className="w-40 aspect-video object-cover rounded-md"
            />
          </Link>

          <div className="flex flex-col">
            <Link
              to={`/User/byChannel/${user.channelId}`}
              className="font-medium line-clamp-2 hover:underline"
            >
              {user.title}
            </Link>
            <span className="text-sm text-gray-500">
              {channel?.channelName || user.uploader}
            </span>
            <span className="text-xs text-gray-400">
              {user.views?.toLocaleString()} views
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
