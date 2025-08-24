import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEye, faClock } from "@fortawesome/free-solid-svg-icons";

export default function ChannelVid() {
  const { channelId } = useParams();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Latest");

  /* ──────────────────────────────────────────────
     Fetch videos once channelId changes
  ────────────────────────────────────────────── */
  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data } = await axios.get(
          `https://youtube-backend-zdni.onrender.com/getVideos/${channelId}`
        );
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [channelId]);

  /* ──────────────────────────────────────────────
     Derived list based on the active pill
  ────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    if (!videos.length) return [];
    switch (selectedFilter) {
      case "Popular":
        return [...videos].sort((a, b) => (b.views || 0) - (a.views || 0));
      case "Oldest":
        return [...videos].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default: /* "Latest" */
        return [...videos].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }, [videos, selectedFilter]);

  /* ──────────────────────────────────────────────
     Early-return states
  ────────────────────────────────────────────── */
  if (loading)
    return (
      <div className="min-h-screen bg-skin-base text-skin-text flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading videos...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-skin-base text-skin-text flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!filtered.length)
    return (
      <div className="min-h-screen bg-skin-base text-skin-text flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📹</div>
          <p className="text-xl text-skin-sub">No videos found</p>
          <p className="text-skin-sub mt-2">
            This channel hasn't uploaded any videos yet.
          </p>
        </div>
      </div>
    );

  /* ──────────────────────────────────────────────
     Render
  ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-skin-base text-skin-text">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-skin-text mb-2">
            Channel Videos
          </h1>
          <p className="text-skin-sub">
            {filtered.length} {filtered.length === 1 ? "video" : "videos"}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["Latest", "Popular", "Oldest"].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedFilter(label)}
              className={`py-2.5 px-6 rounded-full text-sm font-medium transition-all duration-200 
                ${
                  selectedFilter === label
                    ? "bg-red-600 text-white shadow-lg transform scale-105"
                    : "bg-skin-muted text-skin-text hover:bg-gray-300 dark:hover:bg-zinc-600 hover:shadow-md"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((vid) => (
            <Link
              key={vid._id}
              to={`/User/byChannel/${vid.channelId || channelId}`}
              className="group block"
            >
              <div className="bg-skin-base rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-300 to-gray-400 dark:from-zinc-700 dark:to-zinc-800">
                  {vid.thumbnailUrl ? (
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-4xl text-white opacity-70"
                      />
                    </div>
                  )}

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                    {vid.duration || "13:00"}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-black/90 rounded-full p-3">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-xl text-red-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-skin-text leading-tight line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                    {vid.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-skin-sub">
                    {vid.views && (
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faEye} />
                        <span>{vid.views.toLocaleString()} views</span>
                      </div>
                    )}

                    {vid.createdAt && (
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} />
                        <span>
                          {new Date(vid.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button (if needed) */}
        {filtered.length > 12 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-skin-muted hover:bg-gray-300 dark:hover:bg-zinc-600 text-skin-text rounded-lg font-medium transition-colors">
              Load More Videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
