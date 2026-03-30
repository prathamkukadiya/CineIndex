import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "../movie/Search";
import NavLogo from "./NavLogo";
import FilterDropdown from "./FilterDropdown";

/**
 * Navbar Component
 * Navigation header that Orchestrates the sub-components: NavLogo, FilterDropdown, and Search.
 * 
 * @param {string} searchTerm - Current search query
 * @param {Function} setSearchTerm - State setter for search query
 * @param {Function} executeSearch - Function to trigger movie search
 */
const Navbar = ({
  searchTerm,
  setSearchTerm,
  executeSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle scroll effect for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Scrolls to a specific section on the home page.
   * If not on home page, navigates home first then scrolls.
   */
  const scrollToSection = (id) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  /**
   * Navigates to the genre results page.
   */
  const onGenreClick = (id) => {
    setIsDropdownOpen(false);
    navigate(`/genre/${id}`);
  };

  /**
   * Executes search and collapses the search bar.
   */
  const handleSearchTrigger = (query) => {
    executeSearch(query);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-500 py-3 sm:py-4 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-between ${
          isScrolled
            ? "bg-primary/50 backdrop-blur-xl py-3 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <NavLogo />

        {/* Navigation Actions */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
          <FilterDropdown 
            isOpen={isDropdownOpen} 
            setIsOpen={setIsDropdownOpen} 
            onFilterApply={onGenreClick} 
          />

          <button
            onClick={() => scrollToSection("trending-section")}
            className="text-gray-300 cursor-pointer hover:text-white font-medium text-xs sm:text-sm md:text-base transition-colors relative after:content-[''] after:absolute after:bottom--1 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all hover:after:w-full"
          >
            Trending
          </button>
          
          <button
            onClick={() => scrollToSection("all-movies-section")}
            className="text-gray-300 cursor-pointer hover:text-white font-medium text-xs sm:text-sm md:text-base transition-colors relative after:content-[''] after:absolute after:bottom--1 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all hover:after:w-full"
          >
            Browse
          </button>

          {/* Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:scale-110 cursor-pointer transition-transform duration-200"
          >
            <img src="/search.svg" alt="Search" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </nav>

      {/* Expandable Search Input Container */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isSearchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0 invisible"
        }`}
      >
          <div className="max-w-7xl mx-auto">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              executeSearch={handleSearchTrigger}
            />
          </div>
      </div>
    </div>
  );
};

export default Navbar;
