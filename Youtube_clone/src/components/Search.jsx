/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search({ setQuery }) {
  const [input, setInput] = useState("");
  const timeoutRef = useRef(null);

  /* --------------------------------------------------
     Debounce keystrokes → 300 ms
  -------------------------------------------------- */
  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const trimmed = input.trim().toLowerCase();
      setQuery(trimmed);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [input, setQuery]);

  /* --------------------------------------------------
     Handlers
  -------------------------------------------------- */
  const runSearch = () => {
    setQuery(input.trim().toLowerCase());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */
  return (
    <div className="flex  bg-skin-base text-skin-text items-center gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 px-4 py-2 border  bg-skin-base text-skin-text border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={runSearch}
        className=" 0 px-4 py-2  bg-skin-base text-skin-text rounded-r-full border border-gray-300"
        aria-label="Search"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}
