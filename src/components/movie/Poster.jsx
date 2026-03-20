import React from 'react'
import { getImageUrl } from "../../utils";

/**
 * Poster Component
 * Displays a movie poster with consistent styling.
 * 
 * @param {string} poster_path - The TMDB poster image path
 * @param {string} title - The movie title (for alt text)
 * @param {string} className - Optional additional CSS classes
 * @param {string} size - TMDB image size (default: 'w500')
 */
const Poster = ({ poster_path, title, className = "", size = "w500" }) => {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/5 shadow-2xl ${className}`}>
      <img
        src={getImageUrl(poster_path, size)}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default Poster;