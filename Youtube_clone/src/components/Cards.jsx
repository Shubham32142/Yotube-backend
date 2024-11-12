/* eslint-disable react/prop-types */
import allUsers from "./allUsers";
import { Link } from "react-router-dom";

export function Cards({ query, selectedCategory }) {
  const { users, loading, error } = allUsers();

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  return (
    <div className="flex justify-center items-center relative left-[60px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 p-4">
        {users
          .filter((user) => {
            const matchesQuery = user.title.toLowerCase().includes(query);
            const matchesCategory =
              selectedCategory === "All" ||
              (user.categories && user.categories.includes(selectedCategory));
            return matchesQuery && matchesCategory;
          })
          .map((user) => (
            <div
              key={user._id}
              className="w-full h-[250px] sm:h-[270px] lg:h-[300px] rounded-[15px] transition-transform duration-200 hover:scale-105"
            >
              <Link
                to={`/User/byChannel/${user.channelId}`}
                className="no-underline text-black"
              >
                <img
                  src={user.thumbnailUrl || "/path/to/fallback-image.jpg"}
                  alt={user.title}
                  className="w-full h-[200px] object-cover rounded-[15px] transition-all duration-200 hover:rounded-none"
                />
                <div className="p-2">
                  <p className="text-base sm:text-lg font-bold mb-1">
                    {user.title}
                  </p>
                  <p className="text-sm text-gray-500">{user.uploader}</p>
                  <p className="text-xs text-gray-400">{user.views} views</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
