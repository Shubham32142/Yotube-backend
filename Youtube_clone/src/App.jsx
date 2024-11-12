/* eslint-disable no-unused-vars */
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserSidebar } from "./components/UserSidebar";
import { Cards } from "./components/Cards";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
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
      className={`app ${isOpen ? "sidebar-open" : "sidebar-collapsed"} ${
        isHidden ? "hidden" : ""
      }`}
    >
      <Header
        isOpen={isOpen}
        toggleBar={toggleBar}
        setQuery={setQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      {location.pathname.startsWith("/User/byChannel/") ? (
        <UserSidebar isOpen={isOpen} />
      ) : (
        <Sidebar isOpen={isOpen} />
      )}
      <div className="appcontainer">
        <Outlet />
        {/* Only render Cards on the root path or other specific paths */}
        {location.pathname === "/" && (
          <Cards query={query} selectedCategory={selectedCategory} />
        )}
        {/* You can add more conditions here if you want to show Cards on other paths */}
      </div>
    </div>
  );
}

export default App;
