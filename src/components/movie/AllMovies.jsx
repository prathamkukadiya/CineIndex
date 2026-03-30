import React from 'react'
import DetailSection from '../layout/DetailSection';
import MovieCard from './MovieCard'
import Spinner from '../ui/Spinner'

/**
 * AllMovies Component
 * Renders a grid of movie cards. Used for the main browse view, search results, and genre filters.
 * 
 * @param {Array} movieList - Array of movie data from TMDB
 * @param {boolean} isLoading - Loading state for movie fetching
 * @param {string} errorMessage - Error message to display if fetch fails
 */
const AllMovies = ({ movieList, isLoading, errorMessage }) => {

  return (
    <section id="all-movies-section" className='space-y-9'>
        <h2 
        className='text-2xl font-bold text-white sm:text-3xl'
        >
            All Movies
        </h2>
              
        {/* Conditional rendering based on loading/error/success states */}
        {isLoading ? (
            <p className='text-white flex justify-center'>
                <Spinner />
            </p>
            ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
            ) : (
                <ul className='grid grid-cols-2 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
    </section>
  )
}

export default AllMovies