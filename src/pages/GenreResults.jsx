import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GENRES } from '../constants';
import AllMovies from '../components/movie/AllMovies';
import Pagination from '../components/ui/Pagination';
import Container from '../components/layout/Container';

/**
 * GenreResults Page
 * Displays a list of movies belonging to a specific genre.
 * 
 * @param {Array} movieList - List of movies fetched for the genre
 * @param {boolean} isLoading - Loading state for movie fetching
 * @param {string} errorMessage - Error message if fetch fails
 * @param {number} page - Current pagination page
 * @param {number} totalPages - Total available pages
 * @param {Function} handlePageChange - Callback for pagination
 * @param {Function} handleGenreSelect - Callback to trigger genre-specific fetching
 */
const GenreResults = ({ 
  movieList, 
  isLoading, 
  errorMessage, 
  page, 
  totalPages, 
  handlePageChange,
  handleGenreSelect
}) => {
  const { id } = useParams();

  // Find the current genre name from our centralized list
  const currentGenre = GENRES.find(g => g.id === parseInt(id));

  /**
   * Effect hook to trigger the genre-specific API call whenever the URL ID changes.
   */
  useEffect(() => {
    if (id) {
      handleGenreSelect(parseInt(id));
    }
  }, [id, handleGenreSelect]);

  return (
    <div className='relative'>
      {/* Visual background pattern */}
      <div className='bg-hero-pattern w-full h-screen bg-center bg-cover absolute z-0'/>
      
      <Container className="py-24 xs:py-32">
        <div className="mt-10">
          <h2 className='text-3xl font-bold text-white sm:text-4xl mb-12'>
            <span className="text-purple-400">{currentGenre ? currentGenre.name : 'Genre'}</span> Movies
          </h2>
          
          <AllMovies 
            movieList={movieList} 
            isLoading={isLoading} 
            errorMessage={errorMessage} 
          />
        </div>

        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </Container>
    </div>
  );
};

export default GenreResults;
