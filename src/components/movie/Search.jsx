import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Search Component
 * A stylized search input that triggers a movie search and navigates to the search results page.
 * 
 * @param {string} searchTerm - The current text in the search input
 * @param {Function} setSearchTerm - Function to update the search term state
 * @param {Function} executeSearch - Function to trigger the actual API search logic
 */
const Search = ({ searchTerm, setSearchTerm, executeSearch }) => {
  const navigate = useNavigate();

  /**
   * Validates the search query and initiates navigation/search.
   */
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      executeSearch(searchTerm);
      navigate("/search");
    }
  };

  return (
    <div className="w-full bg-primary/50 backdrop-blur-2xl  px-4 py-3 rounded-lg mt-2 max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <img className="absolute left-2 h-5 w-5" src="/search.svg" alt="Search" />
        <input
          className="w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden"
          type="text"
          placeholder="Search Through Thousands of Movies (Press Enter)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Search