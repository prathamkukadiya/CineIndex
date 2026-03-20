import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMovies } from './hooks/useMovies';

// Page Components
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import GenreResults from './pages/GenreResults';
import MovieDetails from './pages/MovieDetails';

// Shared Components
import Navbar from './components/layout/Navbar';

/**
 * Main Application Component
 * Manages the global movie state and provides routing for the entire app.
 * Utilizes the 'useMovies' hook to handle data fetching across different views.
 */
const App = () => {
  // Destructure all necessary state and handlers from our custom hook
  const {
    searchTerm,
    setSearchTerm,
    movieList,
    isLoading,
    isTrendingLoading,
    errorMessage,
    trendingMovies,
    executeSearch,
    page,
    totalPages,
    handlePageChange,
    handleGenreSelect
  } = useMovies();

  // Common props shared between most route components
  const commonProps = {
    searchTerm,
    setSearchTerm,
    executeSearch,
    movieList,
    isLoading,
    errorMessage,
    page,
    totalPages,
    handlePageChange
  };

  return (
    <main className='min-h-screen relative bg-primary overflow-x-hidden'>
      {/* Navigation bar is always visible */}
      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        executeSearch={executeSearch}
      />

      <Routes>
        {/* Landing Page: Shows trending movies and all movies grid */}
        <Route path="/" element={
          <Home 
            {...commonProps}
            trendingMovies={trendingMovies}
            isTrendingLoading={isTrendingLoading}
          />
        } />
        
        {/* Search Results Page: Triggered when user searches from the Navbar */}
        <Route path="/search" element={
          <SearchResults {...commonProps} />
        } />

        {/* Genre Results Page: Shows movies filtered by a specific category */}
        <Route path="/genre/:id" element={
          <GenreResults 
            {...commonProps}
            handleGenreSelect={handleGenreSelect}
          />
        } />

        {/* Movie Details Page: Shows in-depth info about a selected movie */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </main>
  )
}

export default App;