import React from 'react';
import Hero from '../components/movie/Hero';
import TrendingMovies from '../components/movie/TrendingMovies';
import AllMovies from '../components/movie/AllMovies';
import Pagination from '../components/ui/Pagination';
import Container from '../components/layout/Container';

/**
 * Home Page Component
 * The primary entry point for movie discovery. Shows hero banner, trending movies, 
 * and a paginated list of all movies.
 * 
 * @param {Array} trendingMovies - List of popular movies from Firebase
 * @param {boolean} isTrendingLoading - Loading state for trending data
 * @param {Array} movieList - General movie collection from TMDB
 * @param {boolean} isLoading - Loading state for general movies
 * @param {string} errorMessage - Error message if API fails
 * @param {number} page - Current page index
 * @param {number} totalPages - Total available pages
 * @param {Function} handlePageChange - Pagination handler
 * @param {Function} executeSearch - Trigger for initial data load
 */
const Home = ({ 
  executeSearch, 
  trendingMovies, 
  isTrendingLoading, 
  movieList, 
  isLoading, 
  errorMessage, 
  page, 
  totalPages, 
  handlePageChange 
}) => {
  /**
   * Initial effect to trigger data fetching when the home page mounts.
   */
  React.useEffect(() => {
    executeSearch(''); // Fetch discovery movies with empty search
  }, [executeSearch]);

  return (
    <div className='relative'>
      {/* Hero background overlay */}
      <div className='bg-hero-pattern w-full h-screen bg-center bg-cover absolute z-0'/>
      
      <Container>
        <Hero />
        
        {/* Dynamic trending section from Firebase analytics */}
        <TrendingMovies trendingMovies={trendingMovies} isLoading={isTrendingLoading} />
        
        {/* Main movie browse section */}
        <AllMovies 
          movieList={movieList} 
          isLoading={isLoading} 
          errorMessage={errorMessage} 
        />
        
        {/* Global pagination footer */}
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </Container>
    </div>
  );
};

export default Home;
