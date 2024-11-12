import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function VideoGrid() {
  const [selectedFilter, setSelectedFilter] = useState("Latest");
  const { channelId } = useParams(); // Destructure channelId from useParams
  const [videos, setVideos] = useState([]); // State for storing video data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get(
          `http://localhost:3000/getVideos/${channelId}`
        );
        setVideos(response.data); // Assuming your response has a videos array
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    }
    fetchVideos();
  }, [channelId]); // Dependency array includes channelId

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>Error: {error}</p>; // Display error message

  // Check if there are no videos
  if (videos.length === 0) {
    return <p>No videos found.</p>; // Display message if no videos
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Buttons */}
      <div className="flex justify-start gap-4 mb-6">
        {["Latest", "Popular", "Oldest"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === filter
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            } hover:bg-gray-200`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <div className="relative">
              <video
                src={video.videos}
                alt={video.title}
                className="w-full h-auto rounded-lg"
              />
              <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                13:00
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold leading-tight line-clamp-2">
                {video.title}
              </p>
              <p className="text-xs text-gray-500">
                {video.views} views • 1 month ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
