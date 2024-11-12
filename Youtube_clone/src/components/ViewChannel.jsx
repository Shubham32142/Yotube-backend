/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { VideoGrid } from "./ChannelVid";

const ViewChannel = () => {
  const { channelId } = useParams(); // Get channelId from URL params
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `https://youtube-backend-zdni.onrender.com/channel/${channelId}`
        );
        setChannelData(response.data); // Assuming your API returns channel data
        setVideos(response.data.videos); // Assuming your API returns an array of videos
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (!channelData) return <div>Loading...</div>; // Loading state
  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex items-center mb-8">
        <img
          src={channelData.channelBanner}
          alt="Profile"
          className="w-20 h-20 rounded-full mr-6"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{channelData.channelName}</h1>
          <p className="text-gray-600">{channelData.subscribers} subscribers</p>
          <p>{channelData.description}</p>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded-full">
          Subscribe
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-black hover:text-white">
          Home
        </button>
        <button className="bg-black text-white py-2 px-4 rounded hover:bg-black">
          Videos
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-black hover:text-white">
          Shorts
        </button>
      </div>

      <VideoGrid />
    </div>
  );
};

export default ViewChannel;
