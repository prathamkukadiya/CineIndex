import React from 'react';
import AllMovies from '../components/movie/AllMovies';
import Pagination from '../components/ui/Pagination';
import Container from '../components/layout/Container';

/**
 * SearchResults Page Component
 * Renders the results of a user's search query across the movie database.
 * 
 * @param {string} searchTerm - The string the user is looking for
 * @param {Array} movieList - Results returned from the API
 * @param {boolean} isLoading - Fetching state
 * @param {string} errorMessage - Error handling
 * @param {number} page - Pagination state
 * @param {number} totalPages - Total available pages
 * @param {Function} handlePageChange - Pagination callback
 */
const SearchResults = ({ 
  searchTerm, 
  movieList, 
  isLoading, 
  errorMessage, 
  page, 
  totalPages, 
  handlePageChange 
}) => {
  return (
    <div className='relative'>
      {/* Decorative background anchor */}
      <div className='bg-hero-pattern w-full h-screen bg-center bg-cover absolute z-0'/>
      
      <Container className="py-24 xs:py-32">
        <div className="mt-10">
          <h2 className='text-3xl font-bold text-white sm:text-4xl mb-12'>
            Results for <span className="text-purple-400">"{searchTerm}"</span>
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

export default SearchResults;
