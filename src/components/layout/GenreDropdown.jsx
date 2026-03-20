import React from 'react';
import { GENRES } from '../../constants';

/**
 * GenreDropdown Component
 * Handles the selection and display of movie genres in a dropdown menu.
 * 
 * @param {boolean} isOpen - Whether the dropdown is currently visible
 * @param {Function} setIsOpen - Function to toggle the dropdown state
 * @param {Function} onGenreClick - Callback for when a genre is selected
 */
const GenreDropdown = ({ isOpen, setIsOpen, onGenreClick }) => {
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="text-gray-300 hover:text-white font-medium text-sm md:text-base transition-colors flex items-center gap-1"
      >
        Genres{" "}
        <span
          className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      <div
        onMouseLeave={() => setIsOpen(false)}
        className={`absolute top-full -right-10 mt-2 w-48 bg-primary/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="grid grid-cols-1 gap-1">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreClick(genre.id)}
              className="text-left cursor-pointer px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreDropdown;
