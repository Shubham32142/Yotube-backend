/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

export function UserSidebar({ isOpen }) {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-[250px] h-[95vh] bg-white fixed overflow-hidden transition-transform duration-300`}
    >
      <ul className="mb-4">
        <li className="flex items-center px-5 py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md active:bg-blue-50 active:text-black">
          <FontAwesomeIcon icon={faHome} className="mr-4" />
          <Link to="/" className="no-underline text-black">
            Home
          </Link>
        </li>
        <li className="flex items-center px-5 py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTv} className="mr-4" />
          <p>Shorts</p>
        </li>
        <li className="flex items-center px-5 py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-4" />
          <p>Subscriptions</p>
        </li>
      </ul>

      <ul className="mb-4">
        <li className="flex items-center px-5 py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faUser} className="mr-4" />
          <p>You</p>
        </li>
        <li className="flex items-center px-5 py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faHistory} className="mr-4" />
          <p>History</p>
        </li>
      </ul>

      <div className={`${isOpen ? "block" : "hidden"} px-5 py-4`}>
        <p className="text-sm text-gray-600">
          Sign in to like videos, comment, and subscribe.
        </p>
        <button className="flex items-center justify-center w-28 h-10 mt-2 text-sm text-blue-600 border border-gray-300 rounded-full hover:bg-blue-100">
          <FontAwesomeIcon icon={faCircleUser} className="mr-2" /> Sign in
        </button>
      </div>

      <ul className={`${isOpen ? "block" : "hidden"} px-5 py-4`}>
        <h4 className="text-xs font-bold text-gray-500 uppercase">Explore</h4>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTrophy} className="mr-4" /> Trending
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-4" /> Shopping
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faMusic} className="mr-4" /> Music
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faFilm} className="mr-4" /> Movies
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTv} className="mr-4" /> Live
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faGamepad} className="mr-4" /> Gaming
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faNewspaper} className="mr-4" /> News
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTrophy} className="mr-4" /> Sports
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faSchool} className="mr-4" /> Courses
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTshirt} className="mr-4" /> Fashion & Beauty
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faPodcast} className="mr-4" /> Podcasts
        </li>
      </ul>

      <ul className={`${isOpen ? "block" : "hidden"} px-5 py-4`}>
        <h4 className="text-xs font-bold text-gray-500 uppercase">
          More from YouTube
        </h4>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTrophy} className="mr-4" /> YouTube Premium
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faMusic} className="mr-4" /> YouTube Music
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faTrophy} className="mr-4" /> YouTube Kids
        </li>
      </ul>

      <ul className={`${isOpen ? "block" : "hidden"} px-5 py-4`}>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faFlag} className="mr-4" /> Report history
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-4" /> Help
        </li>
        <li className="flex items-center py-2 text-gray-600 hover:bg-gray-100 hover:rounded-md">
          <FontAwesomeIcon icon={faComment} className="mr-4" /> Send feedback
        </li>
      </ul>
    </div>
  );
}
