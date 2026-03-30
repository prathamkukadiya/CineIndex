import React, { useState, useEffect, useRef } from 'react';
import { GENRES } from '../../constants';
import { useParams, useLocation } from 'react-router-dom';

/**
 * FilterDropdown Component
 * Allows users to select multiple genres to filter movies.
 * 
 * @param {boolean} isOpen - Whether the dropdown is visible
 * @param {Function} setIsOpen - Function to toggle visibility
 * @param {Function} onFilterApply - Callback for applying filters
 */
const FilterDropdown = ({ isOpen, setIsOpen, onFilterApply }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const dropdownRef = useRef(null);

  // Sync selected genres from URL if on genre page
  useEffect(() => {
    if (location.pathname.startsWith('/genre/') && id) {
      setSelectedGenres(id.split(',').map(Number));
    } else {
      setSelectedGenres([]);
    }
  }, [location.pathname, id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleCheckboxChange = (genreId) => {
    setSelectedGenres((prev) => 
      prev.includes(genreId) 
        ? prev.filter(g => g !== genreId)
        : [...prev, genreId]
    );
  };

  const handleApply = () => {
    if (selectedGenres.length > 0) {
      onFilterApply(selectedGenres.join(','));
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white font-medium text-xs sm:text-sm md:text-base transition-colors flex items-center gap-1 cursor-pointer"
      >
        Filter{" "}
        <span
          className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`absolute top-full -right-10 mt-2 w-56 bg-primary/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-3 shadow-2xl transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="max-h-60 overflow-y-auto pr-2 grid grid-cols-1 gap-1 hide-scrollbar">
          {GENRES.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center gap-3 cursor-pointer px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleCheckboxChange(genre.id)}
                className="w-4 h-4 rounded border-gray-500 text-purple-600 focus:ring-purple-500 bg-transparent ring-1 ring-white/20 outline-none cursor-pointer"
              />
              <span className="flex-1 select-none">{genre.name}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-end gap-2">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={handleApply}
            disabled={selectedGenres.length === 0}
            className={`px-4 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors cursor-pointer font-medium ${
              selectedGenres.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
