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
    }
  };

  return (
    <div className="bg-primary/50 backdrop-blur-2xl px-3 py-2 sm:px-4 sm:py-3 rounded-lg max-w-3xl mx-4 sm:mx-auto">
      <div className="relative flex items-center">
        <input
          className="w-full bg-transparent py-1 sm:py-2 pl-3 sm:pl-4 pr-9 sm:pr-10 text-sm sm:text-base text-gray-200 placeholder-light-200 outline-hidden"
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 cursor-pointer p-1 hover:scale-110 transition-transform duration-200"
          aria-label="Search"
        >
          <img className="h-5 w-5" src="/search.svg" alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default Search