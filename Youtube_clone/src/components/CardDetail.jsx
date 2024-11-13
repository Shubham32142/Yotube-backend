import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faDownload,
  faShare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comments } from "./Comments";
import { SideVideos } from "./SideVideos";

export function CardDetail() {
  const { channelId } = useParams();
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://youtube-backend-zdni.onrender.com/User/byChannel/${channelId}`
        );
        setUser(response.data);
        setVideoId(response.data.videoId);
        if (response.data.channelId) {
          fetchChannel(response.data.channelId);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        setLoading(false);
      }
    }

    async function fetchChannel(channelId) {
      try {
        const response = await axios.get(
          `https://youtube-backend-zdni.onrender.com/channel/${channelId}`
        );
        setChannel(response.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
        setError("Error fetching channel data");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [channelId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5">
      <div className="lg:flex-3 p-5 bg-white rounded-lg shadow-md w-full">
        {user && channel && (
          <>
            <div className="flex flex-col gap-4">
              <video
                src={user.videos}
                alt="Channel Banner"
                className="w-full h-[230px] sm:h-[400px] md:h-[500px] lg:h-[730px] object-cover rounded-lg"
                controls
              />
              <h2 className="text-xl sm:text-2xl font-semibold">
                {user.title}
              </h2>
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center gap-4 w-full">
                  <Link to={`/viewChannel/${channelId}`}>
                    <img
                      src={user.thumbnailUrl}
                      alt={user.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-700">
                      {channel.channelName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {channel.subscribers} subscribers
                    </p>
                  </div>
                  <button className="mt-3 md:mt-0 md:ml-5 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white font-bold rounded-full hover:opacity-80">
                    Subscribe
                  </button>
                </div>
                <div className="flex flex-wrap justify-end md:flex-nowrap items-center gap-3 w-full py-3">
                  <div className="flex items-center">
                    <button
                      className="flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 border border-gray-200 rounded-l-3xl hover:bg-gray-200"
                      aria-label="Like this video"
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="lg"
                        className="pr-1 sm:pr-2"
                      />
                      {user.likes}
                    </button>
                    <button
                      className="flex items-center px-3 sm:px-2 py-1 sm:py-2 bg-gray-100 border border-gray-200 rounded-r-3xl hover:bg-gray-200"
                      aria-label="Dislike this video"
                    >
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        size="lg"
                        className="pr-1 sm:pr-2"
                      />
                      {user.dislikes}
                    </button>
                  </div>
                  <button className="flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200">
                    <FontAwesomeIcon
                      icon={faShare}
                      size="lg"
                      className="pr-1 sm:pr-2"
                    />
                    Share
                  </button>
                  <button className="flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200">
                    <FontAwesomeIcon
                      icon={faDownload}
                      size="lg"
                      className="pr-1 sm:pr-2"
                    />
                    Download
                  </button>
                  <button className="flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size="lg"
                      className="pr-1 sm:pr-2"
                    />
                    Save
                  </button>
                  <button className="flex items-center px-2 py-1 sm:px-2 sm:py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200">
                    <FontAwesomeIcon icon={faEllipsis} size="lg" />
                  </button>
                </div>
              </div>
              <div className="w-full py-4 bg-gray-100 rounded-lg flex flex-col items-start">
                <span className="text-gray-600 pr-4">{user.views} views</span>
                <span className="text-gray-600">{user.uploadDate}</span>
                <p className="text-gray-700 mt-2">{user.description}</p>
              </div>
            </div>
          </>
        )}
        {videoId && <Comments videoId={videoId} comments={user.comments} />}
      </div>
      <div className="lg:flex-1 p-5 w-full lg:w-auto">
        <SideVideos />
      </div>
    </div>
  );
}
export default CardDetail;
