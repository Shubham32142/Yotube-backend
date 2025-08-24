/* eslint-disable react/prop-types */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignIn } from "./SignIn";
import { Categories } from "./Categories";
import ThemeToggle from "./ThemeToggle";

export function Header({
  isOpen,
  toggleBar,
  setQuery,
  selectedCategory,
  onCategorySelect,
}) {
  const menuIcon = <FontAwesomeIcon icon={faBars} size="xl" />;
  const youtubeIcon = (
    <FontAwesomeIcon icon={faYoutube} style={{ color: "#d43725" }} size="xl" />
  );
  return (
    <div className="w-full fixed top-0 left-0 z-50  bg-skin-base text-skin-text shadow-md">
      <div className="w-full flex justify-between items-center mt-2 px-5 py-2">
        <div className="flex items-center">
          <span
            className="mr-2 p-2 cursor-pointer hover:border hover:border-gray-300 hover:rounded-full"
            onClick={toggleBar}
          >
            {isOpen ? menuIcon : menuIcon}
          </span>
          <span className="text-2xl font-sans">{youtubeIcon} YouTube</span>
          <span className="text-xs font-sans align-super text-gray-500 ml-1">
            IN
          </span>
        </div>
        <Search setQuery={setQuery} />
        <ThemeToggle />
        <SignIn onClick={toggleBar} isOpen={isOpen} />
      </div>
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
    </div>
  );
}
