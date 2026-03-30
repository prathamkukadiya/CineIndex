import React from 'react'
import { Link } from 'react-router-dom'
import { getYear } from '../../utils'
import Poster from './Poster'

/**
 * MovieCard Component
 * Small preview card for a movie, shown in grids.
 * 
 * @param {Object} movie - Movie data object from TMDB
 */
const MovieCard = ({ movie: { id, title, vote_average, poster_path, original_language, release_date } }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className='bg-dark-100 p-2 md:p-5 rounded-2xl shadow-inner shadow-light-100/10 cursor-pointer hover:scale-105 transition-transform duration-300 h-full flex flex-col'>
        <Poster 
          poster_path={poster_path} 
          title={title} 
          className="aspect-2/3 w-full mb-4" 
        />

        {/* Movie Info Section */}
        <div className="mt-0 md:mt-4 flex flex-col flex-1">
          <h3 className='text-white md:font-bold text-sm md:text-base line-clamp-1'>{title}</h3>

          <div className='mt-2 flex flex-row items-center flex-wrap gap-2'>
            {/* Rating */}
            {/* <div className='flex flex-row items-center gap-1'>
              <img className='size-4 object-contain' src="/star.svg" alt="Star Icon" />
              <p className='font-bold text-base text-white'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span className='text-sm text-gray-100'>●</span> */}
            
            {/* Language */}
            <p className='capitalize text-gray-100 text-xs sm:text-base font-medium'>{original_language}</p>
            
            <span className='text-sm text-gray-100'>●</span>
            
            {/* Release Year */}
            <p className='text-gray-100 text-xs sm:text-base font-medium'>{getYear(release_date)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard