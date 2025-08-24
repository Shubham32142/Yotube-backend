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
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comments } from "./Comments";
import SideVideos from "./SideVideos";

export default function CardDetail() {
  const { channelId } = useParams();

  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  /* ──────────────────────────────────────────────
     Fetch user → then channel
  ────────────────────────────────────────────── */
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-zdni.onrender.com/User/byChannel/${channelId}`
        );

        setUser(data);
        setVideoId(data.videoId);

        if (data.channelId) {
          await fetchChannel(data.channelId);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching video data.");
        setLoading(false);
      }
    }

    async function fetchChannel(id) {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-zdni.onrender.com/channel/${id}`
        );
        setChannel(data);
      } catch (err) {
        console.error("Error fetching channel data:", err);
        setError("Error fetching channel data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [channelId]);

  /* ──────────────────────────────────────────────
     Early-return UI states
  ────────────────────────────────────────────── */
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-skin-base">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg text-skin-text">Loading video...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-skin-base">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!user) return null;

  /* ──────────────────────────────────────────────
     Main render
  ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-skin-base text-skin-text">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          {/* Video Player */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl mb-4">
            <video
              controls
              className="w-full aspect-video"
              poster={user.thumbnailUrl}
              preload="metadata"
            >
              <source src={user.videos} type="video/mp4" />
              <source src={user.videos} type="video/webm" />
              <source src={user.videos} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Title */}
          <h1 className="text-xl lg:text-2xl font-bold text-skin-text mb-3 leading-tight">
            {user.title}
          </h1>

          {/* Video Stats */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-skin-sub">
              {user.views && (
                <span className="font-medium">
                  {user.views.toLocaleString()} views
                </span>
              )}
              {user.createdAt && (
                <span>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-2 lg:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-skin-muted hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full transition-colors">
                <FontAwesomeIcon icon={faThumbsUp} className="text-sm" />
                <span className="text-sm font-medium">Like</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-skin-muted hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full transition-colors">
                <FontAwesomeIcon icon={faThumbsDown} className="text-sm" />
                <span className="text-sm font-medium">Dislike</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-skin-muted hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full transition-colors">
                <FontAwesomeIcon icon={faShare} className="text-sm" />
                <span className="text-sm font-medium">Share</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-skin-muted hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full transition-colors">
                <FontAwesomeIcon icon={faDownload} className="text-sm" />
                <span className="text-sm font-medium">Download</span>
              </button>

              <button className="p-2 bg-skin-muted hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full transition-colors">
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center justify-between p-4 bg-skin-muted rounded-xl mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {channel?.channelName?.charAt(0) || "C"}
              </div>

              <div>
                {channel?.channelName && (
                  <Link
                    to={`/viewChannel/${channel.channelId}`}
                    className="font-semibold text-lg text-skin-text hover:text-red-500 transition-colors"
                  >
                    {channel.channelName}
                  </Link>
                )}
                {channel?.subscribers && (
                  <p className="text-sm text-skin-sub">
                    {channel.subscribers.toLocaleString()} subscribers
                  </p>
                )}
              </div>
            </div>

            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors">
              Subscribe
            </button>
          </div>

          {/* Description */}
          {user.description && (
            <div className="bg-skin-muted rounded-xl p-4 mb-6">
              <div className="mb-2">
                <span className="text-sm font-medium text-skin-sub">
                  {user.views?.toLocaleString()} views • {user.uploadDate}
                </span>
              </div>

              <div className="text-skin-text">
                <p
                  className={`whitespace-pre-wrap ${
                    !showFullDescription ? "line-clamp-3" : ""
                  }`}
                >
                  {user.description}
                </p>

                {user.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-sm font-medium text-skin-sub hover:text-skin-text"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-skin-muted rounded-xl p-4">
            <Comments videoId={videoId} />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-[400px] lg:sticky lg:top-4 lg:h-fit">
          <div className="bg-skin-muted rounded-xl p-4">
            <h3 className="font-semibold text-skin-text mb-4">Recommended</h3>
            <SideVideos />
          </div>
        </aside>
      </div>
    </div>
  );
}
