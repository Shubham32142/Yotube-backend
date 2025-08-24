/* eslint-disable react/prop-types */
import { useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import useAllUsers from "./useAllUsers";

export function Categories({ selectedCategory, onCategorySelect }) {
  const { users, loading } = useAllUsers();
  const location = useLocation();
  const stripRef = useRef(null);

  /* --------------------------------------------------
     Build category list once users arrive
  -------------------------------------------------- */
  const categories = useMemo(() => {
    if (!users?.length) return ["All"];
    const extracted = users.flatMap((u) => u.categories || []).filter(Boolean);
    return ["All", ...Array.from(new Set(extracted))];
  }, [users]);

  /* --------------------------------------------------
     Early-return states
  -------------------------------------------------- */
  if (loading) return <p className="text-center">Loading categories…</p>;

  /* Hide strip on watch page */
  if (location.pathname.startsWith("/User/byChannel/")) return null;

  /* --------------------------------------------------
     Scroll helpers
  -------------------------------------------------- */
  const scrollLeft = () =>
    stripRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    stripRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <nav className="relative flex items-center gap-2 px-2 py-3 bg-skin-base text-skin-text">
      {/* left chevron */}
      <button
        onClick={scrollLeft}
        className="hidden md:block px-2 text-lg font-bold"
      >
        ‹
      </button>

      {/* category pills */}
      <ul
        ref={stripRef}
        className="flex overflow-x-auto no-scrollbar gap-2 w-full"
      >
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className={`flex-shrink-0 cursor-pointer px-4 py-1 rounded-lg whitespace-nowrap
              ${
                cat === selectedCategory
                  ? "bg-black text-white dark:bg-zinc-200 dark:text-black"
                  : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* right chevron */}
      <button
        onClick={scrollRight}
        className="hidden md:block px-2 text-lg font-bold"
      >
        ›
      </button>
    </nav>
  );
}
