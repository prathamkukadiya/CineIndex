import React from 'react'
import { Link, Route } from 'react-router-dom'

/**
 * Genres Component
 * Renders a list of genre tags in a pill-style format.
 * 
 * @param {Array} genres - List of genre objects (id, name)
 */
const Genres = ({genres}) => {
  return (
    <div className="flex flex-wrap gap-2">
        {genres?.map((genre) => (
          <Link to={`/genre/${genre.id}`}>
            <span
            key={genre.id}
            className="bg-white/5 border border-white/10 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold hover:bg-white/10 transition cursor-pointer text-gray-200"
            >
                {genre.name}
            </span>
            </Link>
        ))}
    </div>
  )
}

export default Genres