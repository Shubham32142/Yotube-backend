/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHistory,
  faUser,
  faShoppingCart,
  faMusic,
  faFilm,
  faTv,
  faGamepad,
  faNewspaper,
  faTrophy,
  faSchool,
  faTshirt,
  faPodcast,
  faCircleUser,
  faCog,
  faFlag,
  faQuestionCircle,
  faComment,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({ isOpen }) {
  const location = useLocation();

  const MenuItem = ({ icon, label, path, isActive }) => (
    <Link to={path}>
      <li
        className={`flex items-center px-4 py-3 mx-2 rounded-lg
                     transition-all duration-200 cursor-pointer
                     ${
                       isActive
                         ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                         : "text-skin-text hover:bg-skin-muted"
                     }`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`text-lg ${!isOpen ? "mx-auto" : "mr-4"}`}
        />
        <span className={`font-medium truncate ${!isOpen ? "hidden" : ""}`}>
          {label}
        </span>
      </li>
    </Link>
  );

  return (
    <aside
      className={`fixed left-0 top-16 bg-skin-base border-r border-gray-200 
                      dark:border-zinc-800 h-[calc(100vh-4rem)] z-40
                      transition-all duration-300 ease-in-out overflow-hidden
                      ${isOpen ? "w-64" : "w-16"}`}
    >
      <div className="h-full overflow-y-auto py-4 mt-10">
        {/* Main Navigation */}
        <nav className="mb-4">
          <MenuItem
            icon={faHome}
            label="Home"
            path="/"
            isActive={location.pathname === "/"}
          />
          <MenuItem
            icon={faTv}
            label="Shorts"
            path="/shorts"
            isActive={location.pathname === "/shorts"}
          />
          <MenuItem
            icon={faShoppingCart}
            label="Subscriptions"
            path="/subscriptions"
            isActive={location.pathname === "/subscriptions"}
          />
        </nav>

        {/* Divider */}
        <hr className="my-4 mx-4 border-gray-200 dark:border-zinc-700" />

        {/* Personal Section */}
        <nav className="mb-4">
          <MenuItem
            icon={faUser}
            label="You"
            path="/profile"
            isActive={location.pathname === "/profile"}
          />
          <MenuItem
            icon={faHistory}
            label="History"
            path="/history"
            isActive={location.pathname === "/history"}
          />
        </nav>

        {/* Explore Section */}
        {isOpen && (
          <>
            <h4
              className="text-sm font-semibold text-skin-sub uppercase tracking-wide 
                           px-6 py-2 mt-4 mb-1"
            >
              Explore
            </h4>
            <nav className="mb-4">
              <MenuItem
                icon={faFire}
                label="Trending"
                path="/trending"
                isActive={false}
              />
              <MenuItem
                icon={faShoppingCart}
                label="Shopping"
                path="/shopping"
                isActive={false}
              />
              <MenuItem
                icon={faMusic}
                label="Music"
                path="/music"
                isActive={false}
              />
              <MenuItem
                icon={faFilm}
                label="Movies"
                path="/movies"
                isActive={false}
              />
              <MenuItem
                icon={faGamepad}
                label="Gaming"
                path="/gaming"
                isActive={false}
              />
              <MenuItem
                icon={faNewspaper}
                label="News"
                path="/news"
                isActive={false}
              />
              <MenuItem
                icon={faTrophy}
                label="Sports"
                path="/sports"
                isActive={false}
              />
              <MenuItem
                icon={faSchool}
                label="Learning"
                path="/learning"
                isActive={false}
              />
              <MenuItem
                icon={faTshirt}
                label="Fashion & Beauty"
                path="/fashion"
                isActive={false}
              />
              <MenuItem
                icon={faPodcast}
                label="Podcasts"
                path="/podcasts"
                isActive={false}
              />
            </nav>
          </>
        )}

        {/* Settings Section */}
        <hr className="my-4 mx-4 border-gray-200 dark:border-zinc-700" />
        <nav>
          <MenuItem
            icon={faCog}
            label="Settings"
            path="/settings"
            isActive={location.pathname === "/settings"}
          />
          <MenuItem
            icon={faQuestionCircle}
            label="Help"
            path="/help"
            isActive={location.pathname === "/help"}
          />
          <MenuItem
            icon={faComment}
            label="Send feedback"
            path="/feedback"
            isActive={location.pathname === "/feedback"}
          />
        </nav>
      </div>
    </aside>
  );
}
