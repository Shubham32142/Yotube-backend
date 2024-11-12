/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function Search({ setQuery }) {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchClick() {
    setQuery(searchInput.trim() ? searchInput.toLowerCase() : "");
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim()) {
      setQuery("");
    }
  }

  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />;

  return (
    <div className="flex items-center">
      <input
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        className="w-3/5 md:w-custom-width h-12 border border-gray-400 outline-none bg-transparent text-black px-4 rounded-l-full font-semibold shadow-md focus:border-blue-600"
      />
      <button
        onClick={handleSearchClick}
        className="w-16 h-12 border-l-0 border border-gray-400 outline-none bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center rounded-r-full"
      >
        {searchIcon}
      </button>
    </div>
  );
}
