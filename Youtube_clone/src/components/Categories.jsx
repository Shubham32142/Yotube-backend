/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import allUsers from "./allUsers"; // This is assumed to be a hook

export function Categories({ selectedCategory, onCategorySelect }) {
  const containerRef = useRef(null);
  const location = useLocation(); // Get the current location

  // State to store categories fetched from the API
  const [category, setCategory] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Call the custom hook directly in the component
  const { users, loading, error } = allUsers(); // Call it directly, assuming it's a hook

  // Extract categories when users are fetched
  useEffect(() => {
    if (users && users.length > 0) {
      const extractedCategories = users.map((user) => user.categories).flat(); // Assuming 'category' exists in user
      setCategory(["All", ...new Set(extractedCategories)]); // Add "All" as the first category
      setFiltered(users);
    }
  }, [users]);
  console.log(users.categories);
  useEffect(() => {
    if (selectedCategory === "All") {
      // If "All" is selected, reset to show all users
      setFiltered(users);
    } else {
      // Filter users based on the selected category
      const newFilteredUsers = users.filter((user) =>
        user.categories.includes(selectedCategory)
      );
      setFiltered(newFilteredUsers);
    }
  }, [selectedCategory, users]); // This useEffect will run whenever 'users' or selectedCategory changes

  // Scroll the container by a certain amount (e.g., 300px)
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Handle loading and error states (optional)
  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  // Check the current path and decide whether to render categories
  const shouldDisplayCategories =
    !location.pathname.startsWith("/User/byChannel/");

  return (
    <div className="relative flex items-center">
      {shouldDisplayCategories && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center"
            onClick={scrollLeft}
          >
            &lt;
          </button>
          <div
            className="flex overflow-x-auto scrollbar-hide whitespace-nowrap w-full px-4 py-2"
            ref={containerRef}
          >
            <div className="flex gap-2 px-10">
              {/* Render categories dynamically */}
              {category.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => onCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center"
            onClick={scrollRight}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
}
