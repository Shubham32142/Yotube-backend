/* eslint-disable no-unused-vars */
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserSidebar } from "./components/UserSidebar";
import Cards from "./components/Cards";
import useAllUsers from "./components/useAllUsers";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { error } = useAllUsers();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/User/byChannel/")) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const toggleBar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={` bg-skin-base text-skin-text app ${
        isOpen ? "sidebar-open" : "sidebar-collapsed"
      } ${isHidden ? "hidden" : ""}`}
    >
      {/* ───── Header is ALWAYS rendered ───── */}
      <Header
        isOpen={isOpen}
        toggleBar={toggleBar}
        setQuery={setQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* optional sidebars stay visible too */}
      {location.pathname.startsWith("/User/byChannel/") ? (
        <UserSidebar isOpen={isOpen} />
      ) : (
        <Sidebar isOpen={isOpen} />
      )}

      {/* ───── Body ───── */}
      <div className="appcontainer">
        {error && (
          <p className="mt-10 text-center text-red-600 text-lg font-semibold">
            Error: {error}
          </p>
        )}
        <Outlet context={{ query, selectedCategory }} />
      </div>
    </div>
  );
}

export default App;
