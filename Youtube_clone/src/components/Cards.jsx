/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAllUsers from "./useAllUsers";
import { useOutletContext } from "react-router-dom";

export default function Cards() {
  const { users, loading } = useAllUsers();
  const { query, selectedCategory } = useOutletContext();

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;

  const search = query.trim().toLowerCase();

  const filtered = users.filter((user) => {
    const matchesQuery =
      !search ||
      user.title?.toLowerCase().includes(search) ||
      user.uploader?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" || user.categories?.includes(selectedCategory);

    return matchesQuery && matchesCategory;
  });

  return (
    <section className="flex justify-center items-center bg-skin-base text-skin-text relative left-[60px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 p-4">
        {filtered.map((user) => (
          <Link
            key={user._id}
            to={`/User/byChannel/${user.channelId}`}
            className="w-full h-[270px] rounded-[15px] transition-transform duration-200 hover:scale-105 no-underline bg-skin-base text-skin-text"
          >
            <img
              src={
                user.thumbnailUrl ||
                "https://placehold.co/400x225?text=No+Thumbnail"
              }
              alt={user.title}
              className="w-full h-[200px] object-cover rounded-[15px] transition-all duration-200 hover:rounded-none"
            />

            <div className="p-2">
              <p className="text-base sm:text-lg font-bold truncate">
                {user.title}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.uploader}</p>
              <p className="text-xs text-gray-400">
                {user.views?.toLocaleString() || 0} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
