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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed bg-white h-[95vh] transition-all hover:scroll-smooth mt-12 ease-in-out duration-300 ${
        isOpen ? "w-[210px]" : "w-[60px]"
      }`}
    >
      {/* Home, Shorts, Subscriptions Section */}
      <ul className="mb-4">
        <Link to="/">
          <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg active:bg-blue-100">
            <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
            <p className={`${!isOpen && "hidden"} truncate`}>Home</p>
          </li>
        </Link>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTv} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>Shorts</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faShoppingCart} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>Subscriptions</p>
        </li>
      </ul>

      {/* Profile and History Section */}
      <ul className="mb-4">
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faUser} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>You</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faHistory} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>History</p>
        </li>
      </ul>

      {/* Sign In Section */}
      {isOpen && (
        <div className="px-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Sign in to like videos, comment, and subscribe.
          </p>
          <button className="w-[100px] border border-gray-300 text-blue-600 py-2 rounded-full flex items-center justify-center hover:bg-blue-100">
            <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
            Sign in
          </button>
        </div>
      )}

      {/* Explore Section */}
      <ul className={`mb-4 ${!isOpen && "hidden"}`}>
        <h4 className="text-xs uppercase text-gray-400 pl-4 mb-2">Explore</h4>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTrophy} className="text-xl mr-4" />
          <p>Trending</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faShoppingCart} className="text-xl mr-4" />
          <p>Shopping</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faMusic} className="text-xl mr-4" />
          <p>Music</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faFilm} className="text-xl mr-4" />
          <p>Movies</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTv} className="text-xl mr-4" />
          <p>Live</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faGamepad} className="text-xl mr-4" />
          <p>Gaming</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faNewspaper} className="text-xl mr-4" />
          <p>News</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTrophy} className="text-xl mr-4" />
          <p>Sports</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faSchool} className="text-xl mr-4" />
          <p>Courses</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTshirt} className="text-xl mr-4" />
          <p>Fashion & Beauty</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faPodcast} className="text-xl mr-4" />
          <p>Podcasts</p>
        </li>
      </ul>

      {/* More from YouTube Section */}
      <ul className={`mb-4 ${!isOpen && "hidden"}`}>
        <h4 className="text-xs uppercase text-gray-400 pl-4 mb-2">
          More from YouTube
        </h4>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTrophy} className="text-xl mr-4" />
          <p>YouTube Premium</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faMusic} className="text-xl mr-4" />
          <p>YouTube Music</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faTrophy} className="text-xl mr-4" />
          <p>YouTube Kids</p>
        </li>
      </ul>

      {/* Settings Section */}
      <ul className="mb-4">
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faCog} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>Settings</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faFlag} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>Report history</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>Help</p>
        </li>
        <li className="flex items-center p-4 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 rounded-lg">
          <FontAwesomeIcon icon={faComment} className="text-xl mr-4" />
          <p className={`${!isOpen && "hidden"} truncate`}>Send feedback</p>
        </li>
      </ul>
    </div>
  );
}
